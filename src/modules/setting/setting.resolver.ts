import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Setting } from './model/setting.model';
import { SettingService } from './setting.service';

@Resolver('Setting')
export class SettingResolver {
  constructor(private readonly settingService: SettingService) {}

  @Query('setting')
  public async find(@Args('id') id: string): Promise<Setting> {
    return this.settingService.find(id);
  }

  @Query('settingList')
  public async list(
    @Args('showInactive') showInactive: boolean,
  ): Promise<Setting[]> {
    return this.settingService.list(showInactive);
  }

  @Mutation('registerSetting')
  public async create(
    @Args('description') description: string,
  ): Promise<Setting> {
    return this.settingService.create(description);
  }

  @Mutation('updateSettingDescription')
  public async updateDescription(
    @Args('id') id: string,
    @Args('description') description: string,
  ): Promise<Setting> {
    return this.settingService.updateDescription(id, description);
  }

  @Mutation('updateSettingStatus')
  public async updateStatus(
    @Args('id') id: string,
    @Args('isActive') isActive: boolean,
  ): Promise<Setting> {
    return this.settingService.updateStatus(id, isActive);
  }

  @Mutation('removeSetting')
  public async remove(@Args('id') id: string): Promise<boolean> {
    return this.settingService.delete(id);
  }
}
