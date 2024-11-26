import { Controller, Get, Param } from '@nestjs/common';
import { CountriesService } from './countries.service';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  getCountries() {
    return this.countriesService.getCountries();
  }

  @Get(':countryCode')
  getCountryByCode(@Param('countryCode') countryCode: string) {
    return this.countriesService.getCountryByCode(countryCode);
  }
}
