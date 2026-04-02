import type { GlobalConfig } from 'payload'
import { isAdminOrEditor, isPublic } from '../access'

export const OrchestratorModel: GlobalConfig = {
  slug: 'orchestrator-model',
  label: 'Orchestrator Model',
  admin: {
    group: 'Page Sections',
    description: '"How We Work" section — the four-pillar orchestrator model diagram.',
  },
  access: {
    read:   isPublic,
    update: isAdminOrEditor,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      localized: true,
      defaultValue: 'How We Work',
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'The Orchestrator Model',
    },
    {
      name: 'body',
      type: 'textarea',
      localized: true,
      defaultValue: "We don't just install technology; we ensure it integrates into a coherent, strategic whole. This is a discipline of continuous design, governance, and refinement — not a static state.",
    },
    {
      name: 'pillars',
      type: 'array',
      label: 'Model Pillars',
      minRows: 2,
      maxRows: 6,
      admin: { description: 'Steps or phases of the orchestrator model shown in the flow diagram.' },
      fields: [
        { name: 'number',      type: 'text', required: true, admin: { description: 'e.g. "01".' } },
        { name: 'title',       type: 'text', required: true, localized: true },
        { name: 'description', type: 'textarea', required: true, localized: true },
        {
          name: 'icon',
          type: 'select',
          admin: { description: 'Optional icon for this pillar.' },
          options: [
            { label: 'Strategy',     value: 'strategy' },
            { label: 'Orchestration', value: 'orchestration' },
            { label: 'Execution',    value: 'execution' },
            { label: 'Outcomes',     value: 'outcomes' },
            { label: 'Default',      value: 'default' },
          ],
        },
      ],
    },
    {
      name: 'diagram',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional static diagram image. Used as fallback if the animated version is not available.' },
    },
  ],
}
