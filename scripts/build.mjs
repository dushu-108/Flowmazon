import { execSync } from 'child_process';

try {
  // Run database migrations
  execSync('npx prisma migrate deploy', { stdio: 'inherit' });
  
  // Generate Prisma Client
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  // Build Next.js app
  execSync('next build', { stdio: 'inherit' });
} catch (error) {
  console.error('Error during build:', error);
  process.exit(1);
} 