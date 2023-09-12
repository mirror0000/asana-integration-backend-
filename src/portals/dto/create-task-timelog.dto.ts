import {
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsString,
  Matches,
  ValidateIf,
} from 'class-validator';
export class CreateTaskTimeLog {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ValidateIf((o) => o.owner)
  @IsString()
  owner: string;

  @IsNotEmpty()
  @IsIn(['Billable', 'Non Billable'])
  bill_status: string;

  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'Time must be in the format of hh:mm',
  })
  hours: string;

  @ValidateIf((o) => o.notes)
  @IsString()
  notes: string;

  @ValidateIf((o) => o.custom_fields && typeof o.custom_fields === 'object')
  custom_fields: any;

  @ValidateIf((o) => o.cost_per_hour)
  cost_per_hour: number;
}
