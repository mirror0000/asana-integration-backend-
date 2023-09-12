import { PartialType } from '@nestjs/mapped-types';
import { CreatePortalDto } from './create-portal.dto';

export class UpdatePortalDto extends PartialType(CreatePortalDto) {}
