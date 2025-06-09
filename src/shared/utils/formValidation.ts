import { TrackFormSchema, type TrackForm } from '@/shared/utils/trackFormSchema.ts'
import { defaultValidationErrors } from '@/shared/utils/defaultTrackForm.ts'

export function validateTrackForm(form: TrackForm): {
  isValid: boolean
  errors: typeof defaultValidationErrors
} {
  const result = TrackFormSchema.safeParse(form)
  const errors = { ...defaultValidationErrors }

  if (!result.success) {
    for (const issue of result.error.issues) {
      const path = issue.path[0]
      if (typeof path === 'string' && path in errors) {
        errors[path as keyof typeof defaultValidationErrors] = issue.message
      }
    }
  }

  return {
    isValid: result.success,
    errors,
  }
}
