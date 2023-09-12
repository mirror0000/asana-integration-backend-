import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.enableCors({
    origin: configService.get('CLIENT_URL'),
  });
  const port = configService.get('PORT') || 3000;
  await app.listen(port);
}
bootstrap();


// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ConfigService } from '@nestjs/config';
// import { ValidationPipe } from '@nestjs/common';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   const configService = app.get(ConfigService);

//   // Whitelist the IP address used by Jira
//   const jiraIpAddress = 'https://focusbear.atlassian.net'; // Replace with the actual IP address used by Jira
//   app.enableCors({
//     origin: '*',
//   });

//   app.useGlobalPipes(
//     new ValidationPipe({
//       whitelist: true,
//     }),
//   );

//   const port = configService.get('PORT') || 3000;
//   await app.listen(port);
// }
// bootstrap();
