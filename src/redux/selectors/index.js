export const selectUser = (state) => state.auth.user
export const selectToken = (state) => state.auth.token
export const selectIsAuthenticated = (state) => state.auth.is_authenticated
export const selectFirstLaunch = (state) => state.general.first_launch
export const selectAlertMode = (state) => state.general.alert_mode
export const selectAppConfig = (state) => state.general.app_config
export const selectEmploymentTypes = (state) => state.general.employment_types ?? []
export const selectWorkplaceTypes = (state) => state.general.workplace_types ?? []
export const selectSavedBusinessIds = (state) => state.general.saved_business_ids ?? []
export const selectSavedJobIds = (state) => state.general.saved_job_ids ?? []
