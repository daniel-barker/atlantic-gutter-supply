import { PrismaClient } from '../src/generated/prisma';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@atlanticguttersupply.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@atlanticguttersupply.com',
      password: hashedPassword,
      role: 'admin',
    },
  });

  console.log('Created admin user:', admin.email);

  // Create product categories
  const categories = [
    {
      name: 'Gutters',
      description: 'High-quality gutters for residential and commercial use',
      slug: 'gutters',
    },
    {
      name: 'Downspouts',
      description: 'Durable downspouts in various styles and materials',
      slug: 'downspouts',
    },
    {
      name: 'Hangers',
      description: 'Sturdy hangers for secure gutter installation',
      slug: 'hangers',
    },
    {
      name: 'Accessories',
      description: 'Essential accessories for complete gutter systems',
      slug: 'accessories',
    },
  ];

  for (const category of categories) {
    const createdCategory = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
    console.log(`Created category: ${createdCategory.name}`);
  }

  // Create sample products
  const products = [
    {
      name: '5-inch K-Style Gutter',
      description: 'Standard 5-inch K-Style aluminum gutter for residential use',
      slug: '5-inch-k-style-gutter',
      price: 8.99,
      sku: 'GUT-KS5-01',
      imageUrl: '/images/products/k-style-gutter.jpg',
      categoryId: (await prisma.category.findUnique({ where: { slug: 'gutters' } }))!.id,
    },
    {
      name: '6-inch K-Style Gutter',
      description: 'Larger 6-inch K-Style aluminum gutter for heavy rainfall areas',
      slug: '6-inch-k-style-gutter',
      price: 10.99,
      sku: 'GUT-KS6-01',
      imageUrl: '/images/products/k-style-gutter-6.jpg',
      categoryId: (await prisma.category.findUnique({ where: { slug: 'gutters' } }))!.id,
    },
    {
      name: 'Half-Round Gutter',
      description: 'Classic half-round gutter design for traditional homes',
      slug: 'half-round-gutter',
      price: 12.99,
      sku: 'GUT-HR-01',
      imageUrl: '/images/products/half-round-gutter.jpg',
      categoryId: (await prisma.category.findUnique({ where: { slug: 'gutters' } }))!.id,
    },
    {
      name: 'Rectangular Downspout',
      description: 'Standard rectangular aluminum downspout',
      slug: 'rectangular-downspout',
      price: 7.99,
      sku: 'DS-RECT-01',
      imageUrl: '/images/products/rectangular-downspout.jpg',
      categoryId: (await prisma.category.findUnique({ where: { slug: 'downspouts' } }))!.id,
    },
    {
      name: 'Round Downspout',
      description: 'Round aluminum downspout for a classic look',
      slug: 'round-downspout',
      price: 8.99,
      sku: 'DS-RND-01',
      imageUrl: '/images/products/round-downspout.jpg',
      categoryId: (await prisma.category.findUnique({ where: { slug: 'downspouts' } }))!.id,
    },
    {
      name: 'Hidden Gutter Hangers',
      description: 'Hidden hangers for a clean look with K-style gutters',
      slug: 'hidden-gutter-hangers',
      price: 2.49,
      sku: 'HNG-HID-01',
      imageUrl: '/images/products/hidden-hangers.jpg',
      categoryId: (await prisma.category.findUnique({ where: { slug: 'hangers' } }))!.id,
    },
    {
      name: 'Spike and Ferrule Set',
      description: 'Traditional spike and ferrule hanger set',
      slug: 'spike-ferrule-set',
      price: 1.99,
      sku: 'HNG-SF-01',
      imageUrl: '/images/products/spike-ferrule.jpg',
      categoryId: (await prisma.category.findUnique({ where: { slug: 'hangers' } }))!.id,
    },
    {
      name: 'Gutter Guard',
      description: 'Mesh gutter guard to prevent debris buildup',
      slug: 'gutter-guard',
      price: 5.99,
      sku: 'ACC-GG-01',
      imageUrl: '/images/products/gutter-guard.jpg',
      categoryId: (await prisma.category.findUnique({ where: { slug: 'accessories' } }))!.id,
    },
    {
      name: 'Downspout Elbow',
      description: 'Aluminum downspout elbow for directing water flow',
      slug: 'downspout-elbow',
      price: 3.99,
      sku: 'ACC-DSE-01',
      imageUrl: '/images/products/downspout-elbow.jpg',
      categoryId: (await prisma.category.findUnique({ where: { slug: 'accessories' } }))!.id,
    },
    {
      name: 'Gutter Sealant',
      description: 'Professional-grade gutter sealant for leak prevention',
      slug: 'gutter-sealant',
      price: 6.99,
      sku: 'ACC-GS-01',
      imageUrl: '/images/products/gutter-sealant.jpg',
      categoryId: (await prisma.category.findUnique({ where: { slug: 'accessories' } }))!.id,
    },
  ];

  for (const product of products) {
    const createdProduct = await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
    console.log(`Created product: ${createdProduct.name}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
