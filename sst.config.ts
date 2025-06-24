/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'aws-playwright',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
      providers: { aws: '6.83.0' },
    };
  },
  async run() {
    const api = new sst.aws.Function('TestLambda', {
      url: true,
      memory: '1 GB',
      timeout: '1 minute',
      handler: 'browser.handler',
      nodejs: {
        install: ['@sparticuz/chromium', 'chromium-bidi', 'playwright-core'],
      },
    });

    return {
      url: api.url,
    };
  },
});
