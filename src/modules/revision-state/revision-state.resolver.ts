import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RevisionState } from './model/revision-state.model';
import { RevisionStateService } from './revision-state.service';

@Resolver('RevisionState')
export class RevisionStateResolver {
  constructor(private readonly revisionStateService: RevisionStateService) {}

  @Query('revisionState')
  public async find(@Args('id') id: string): Promise<RevisionState> {
    return this.revisionStateService.find(id);
  }

  @Query('revisionStateList')
  public async list(
    @Args('showInactive') showInactive: boolean,
  ): Promise<RevisionState[]> {
    return this.revisionStateService.list(showInactive);
  }

  @Mutation('registerRevisionState')
  public async create(
    @Args('description') description: string,
  ): Promise<RevisionState> {
    return this.revisionStateService.create(description);
  }

  @Mutation('updateRevisionStateDescription')
  public async updateDescription(
    @Args('id') id: string,
    @Args('description') description: string,
  ): Promise<RevisionState> {
    return this.revisionStateService.updateDescription(id, description);
  }

  @Mutation('updateRevisionStateStatus')
  public async updateStatus(
    @Args('id') id: string,
    @Args('isActive') isActive: boolean,
  ): Promise<RevisionState> {
    return this.revisionStateService.updateStatus(id, isActive);
  }

  @Mutation('removeRevisionState')
  public async remove(@Args('id') id: string): Promise<boolean> {
    return this.revisionStateService.delete(id);
  }
}
