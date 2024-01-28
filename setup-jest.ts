// setup-jest.ts
import 'jest-preset-angular/setup-jest';

import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

getTestBed().resetTestEnvironment();
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
  {
    teardown: {
      destroyAfterEach: true, // Angular recommends this, but it may break existing tests
    },
  }
);
