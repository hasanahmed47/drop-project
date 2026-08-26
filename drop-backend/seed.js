import 'dotenv/config';
import connectDB from './src/config/db.js';
import Coffee from './src/models/Coffee.js';
import User from './src/models/User.js';
import seedCoffees from './src/data/seedCoffees.js';

async function seed() {
  await connectDB();

  await Coffee.deleteMany();
  await Coffee.insertMany(seedCoffees);
  console.log(`Seeded ${seedCoffees.length} coffees.`);

  const adminEmail = 'admin@dropcoffee.com';
  const existingAdmin = await User.findOne({ email: adminEmail });

  if (!existingAdmin) {
    await User.create({
      name: 'DROP Admin',
      email: adminEmail,
      password: 'admin12345',
      role: 'admin',
    });
    console.log(`Created default admin — email: ${adminEmail} / password: admin12345`);
  } else {
    console.log('Default admin already exists, skipping.');
  }

  console.log('Seeding complete.');
  process.exit(0);
}

seed().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
