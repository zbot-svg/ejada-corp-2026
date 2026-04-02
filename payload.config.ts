import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import type { MigrateUpArgs } from '@payloadcms/db-sqlite'
import { getTableConfig } from 'drizzle-orm/sqlite-core'
import { fileURLToPath } from 'url'
import path from 'path'

// ── Collections ────────────────────────────────────────────────────────────
import {
  Users,
  Media,
  CaseStudies,
  Partners,
  Capabilities,
  Sectors,
  Insights,
  ContactSubmissions,
} from './collections'

// ── Globals ────────────────────────────────────────────────────────────────
import {
  SiteSettings,
  Navigation,
  Hero,
  WhoWeAre,
  WhatWeBelieve,
  OrchestratorModel,
  Values,
  WhatWeEnable,
  ProofPoints,
  Contact,
  Footer,
} from './globals'

// ─────────────────────────────────────────────────────────────────────────────
// Custom production migration — creates all Payload tables via Drizzle schema
// introspection without requiring drizzle-kit (which has missing deps on Vercel).
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Map a Drizzle column's SQLite type to a DDL type string.
 */
function columnTypeToDDL(col: any): string {
  const t = col.columnType as string
  if (t === 'SQLiteInteger' || t === 'SQLiteBigInt' || t === 'SQLiteBoolean') return 'integer'
  if (t === 'SQLiteNumeric') return 'numeric'
  if (t === 'SQLiteReal') return 'real'
  if (t === 'SQLiteBlob') return 'blob'
  return 'text' // SQLiteText, SQLiteTimestamp, etc.
}

/**
 * Production migration: create all Payload tables using schema introspection.
 * Uses only drizzle-orm (bundled) — avoids drizzle-kit which has missing deps.
 */
async function initialSchemaMigration({ payload }: MigrateUpArgs): Promise<void> {
  const adapter = (payload as any).db
  const schema = adapter.schema as Record<string, any>

  const statements: string[] = []

  for (const [, tableOrRelation] of Object.entries(schema)) {
    // Skip relation objects — they're not tables
    if (typeof tableOrRelation !== 'object' || !tableOrRelation || !tableOrRelation[Symbol.for('drizzle:IsDrizzleTable')]) continue
    try {
      const config = getTableConfig(tableOrRelation)
      const cols = config.columns.map((c: any) => {
        const parts = [`"${c.name}"`, columnTypeToDDL(c)]
        if (c.primary) parts.push('primary key')
        if (c.notNull && !c.primary) parts.push('not null')
        if (c.autoIncrement) parts.push('autoincrement')
        if (c.hasDefault && c.default !== undefined && c.default !== null && typeof c.default !== 'object') {
          const dflt = typeof c.default === 'string' ? `'${c.default.replace(/'/g, "''")}'` : c.default
          parts.push(`default ${dflt}`)
        }
        return parts.join(' ')
      })
      // FK processing in its own try-catch: if it throws, we still create the table
      // (SQLite doesn't enforce FKs by default, so missing FK clauses are safe)
      let fks: string[] = []
      try {
        fks = config.foreignKeys.map((fk: any) => {
          const refTable = getTableConfig(fk.reference().foreignTable)
          const refCols = fk.reference().foreignColumns.map((c: any) => `"${c.name}"`).join(', ')
          return `foreign key (${fk.columns.map((c: any) => `"${c.name}"`).join(', ')}) references "${refTable.name}"(${refCols})${fk.onDelete ? ` on delete ${fk.onDelete}` : ''}`
        })
      } catch (_fkErr) {
        // FK introspection failed — create table without FK constraints
        payload.logger.warn({ msg: `[migration] Skipping FK constraints for table "${config.name}"` })
        fks = []
      }
      const allParts = [...cols, ...fks]
      statements.push(`create table if not exists "${config.name}" (\n  ${allParts.join(',\n  ')}\n)`)
    } catch (_e) {
      // Skip non-table entries
    }
  }

  // Execute all CREATE TABLE statements
  for (const stmt of statements) {
    await adapter.execute({ drizzle: adapter.drizzle, raw: stmt })
  }

  // Create indexes from schema
  for (const [, tableOrRelation] of Object.entries(schema)) {
    if (typeof tableOrRelation !== 'object' || !tableOrRelation || !tableOrRelation[Symbol.for('drizzle:IsDrizzleTable')]) continue
    try {
      const config = getTableConfig(tableOrRelation)
      for (const idx of config.indexes) {
        const idxConfig = idx.config
        if (!idxConfig) continue
        const unique = idxConfig.unique ? 'unique ' : ''
        const colList = idxConfig.columns.map((c: any) => `"${typeof c === 'string' ? c : c.name}"`).join(', ')
        const idxName = idxConfig.name || `${config.name}_${idxConfig.columns.map((c: any) => typeof c === 'string' ? c : c.name).join('_')}_idx`
        await adapter.execute({
          drizzle: adapter.drizzle,
          raw: `create ${unique}index if not exists "${idxName}" on "${config.name}" (${colList})`
        })
      }
    } catch (_e) {
      // Skip errors for individual indexes
    }
  }

  payload.logger.info({ msg: 'Schema applied via drizzle-orm introspection' })
}

// ─────────────────────────────────────────────────────────────────────────────

const filename = fileURLToPath(import.meta.url)
const dirname  = path.dirname(filename)

export default buildConfig({
  // ── Admin UI ────────────────────────────────────────────────────────────
  admin: {
    user: 'users',
    meta: {
      title:       'Ejada CMS',
      description: 'Ejada Systems content management',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: '/components/admin/Logo#Logo',
        Icon: '/components/admin/Icon#Icon',
      },
      providers: ['/components/admin/AdminStyleProvider#AdminStyleProvider'],
      beforeLogin: ['/components/admin/BeforeLogin#BeforeLogin'],
      beforeDashboard: ['/components/admin/DashboardBanner#DashboardBanner'],
      afterNavLinks: ['/components/admin/NavFooter#NavFooter'],
    },
  },

  // ── Rich-text editor ────────────────────────────────────────────────────
  editor: lexicalEditor(),

  // ── Localization ────────────────────────────────────────────────────────
  localization: {
    locales: [
      { label: 'English', code: 'en' },
      { label: 'العربية', code: 'ar', rtl: true },
    ],
    defaultLocale: 'en',
    fallback: true,
  },

  // ── Collections ─────────────────────────────────────────────────────────
  collections: [
    Users,
    Media,
    CaseStudies,
    Partners,
    Capabilities,
    Sectors,
    Insights,
    ContactSubmissions,
  ],

  // ── Globals ──────────────────────────────────────────────────────────────
  globals: [
    // Configuration
    SiteSettings,
    Navigation,
    Footer,

    // Page sections (in render order)
    Hero,
    WhoWeAre,
    WhatWeBelieve,
    OrchestratorModel,
    Values,
    WhatWeEnable,
    ProofPoints,
    Contact,
  ],

  // ── Database ─────────────────────────────────────────────────────────────
  db: sqliteAdapter({
    // On Vercel the project root is read-only — only /tmp is writable.
    // If DATABASE_URI is a relative file path (e.g. "file:./ejada.db"), rewrite it
    // to /tmp on Vercel. Otherwise honour whatever DATABASE_URI is set to.
    client: {
      url: (() => {
        const uri = process.env.DATABASE_URI
        if (process.env.VERCEL) {
          // Relative file:// URIs can't be written on Vercel's read-only FS
          if (!uri || uri.startsWith('file:./') || uri.startsWith('file:ejada')) {
            return 'file:/tmp/ejada.db'
          }
        }
        return uri || `file:${path.resolve(dirname, './ejada.db')}`
      })(),
    },
    // push: true for local dev (NODE_ENV !== 'production').
    // prodMigrations handles production cold starts via schema introspection.
    push: true,
    prodMigrations: [
      { name: 'initial', up: initialSchemaMigration, down: async () => {} },
    ],
  }),

  // ── Security ─────────────────────────────────────────────────────────────
  secret: process.env.PAYLOAD_SECRET || 'ejada-cms-secret-dev-key-change-in-production',

  // ── TypeScript ───────────────────────────────────────────────────────────
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  // ── CORS / CSRF ──────────────────────────────────────────────────────────
  cors:  [process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'].filter(Boolean),
  csrf:  [process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'].filter(Boolean),
})
