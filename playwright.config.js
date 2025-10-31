// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
                             //export keyword is used to export the config details throughout all the modules
  testDir: './tests',       //to fetch tests from this folder
  timeout: 40000,         //declaring default timeout seconds
  expect:{
    timeout: 50000
    ,       //declaring timeout explicitly for assertions
  },
  reporter: 'html',
  use:
  {
    browserName : 'chromium'    , //which browser to use
    headless :  false      //instead of typing in command lien to run in head mode , mention in confi file 
  }
});

