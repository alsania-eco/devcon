export class ProfileLifecycleManager {
  private loaders: any[] = [];
  registerProfileLoader(loader: any) { this.loaders.push(loader); }
  async activateProfile(name: string) { /* future */ }
  async deactivateAllProfiles() { /* future */ }
}
