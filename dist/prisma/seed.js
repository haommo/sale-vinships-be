"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Seeding database...');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const hashedSalesPassword = await bcrypt.hash('sales123', 10);
    const hashedMarketingPassword = await bcrypt.hash('marketing123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@vinship.com' },
        update: {},
        create: {
            email: 'admin@vinship.com',
            password: hashedPassword,
            name: 'Admin User',
            role: 'ADMIN',
            status: 'ACTIVE',
        },
    });
    const johnSales = await prisma.user.upsert({
        where: { email: 'john.sales@vinship.com' },
        update: {},
        create: {
            email: 'john.sales@vinship.com',
            password: hashedSalesPassword,
            name: 'John Sales',
            role: 'SALES',
            status: 'ACTIVE',
        },
    });
    const janeSales = await prisma.user.upsert({
        where: { email: 'jane.sales@vinship.com' },
        update: {},
        create: {
            email: 'jane.sales@vinship.com',
            password: hashedSalesPassword,
            name: 'Jane Sales',
            role: 'SALES',
            status: 'ACTIVE',
        },
    });
    const marketing = await prisma.user.upsert({
        where: { email: 'marketing@vinship.com' },
        update: {},
        create: {
            email: 'marketing@vinship.com',
            password: hashedMarketingPassword,
            name: 'Marketing User',
            role: 'MARKETING',
            status: 'ACTIVE',
        },
    });
    console.log('✅ Created users:', {
        admin: admin.email,
        johnSales: johnSales.email,
        janeSales: janeSales.email,
        marketing: marketing.email,
    });
    await prisma.lead.createMany({
        data: [
            {
                name: 'Tech Startup Inc',
                company: 'Tech Startup',
                website: 'https://techstartup.com',
                region: 'CA',
                industry: 'Technology',
                platform: 'facebook',
                source: 'ads',
                status: 'NEW',
                emails: ['contact@techstartup.com'],
                phones: ['1234567890'],
                keywords: ['tech', 'startup'],
                notes: ['Initial contact made'],
                userId: johnSales.id,
            },
            {
                name: 'Finance Corp',
                company: 'Finance Corp Ltd',
                website: 'https://financecorp.com',
                region: 'NY',
                industry: 'Finance',
                platform: 'google',
                source: 'search',
                status: 'CONTACTED',
                emails: ['info@financecorp.com'],
                phones: ['9876543210'],
                keywords: ['finance', 'investment'],
                notes: ['Called on Monday', 'Follow up next week'],
                userId: johnSales.id,
            },
            {
                name: 'Healthcare Plus',
                company: 'Healthcare Plus',
                region: 'TX',
                industry: 'Healthcare',
                platform: 'linkedin',
                source: 'referral',
                status: 'POTENTIAL',
                emails: ['contact@healthcareplus.com'],
                phones: ['5551234567'],
                keywords: ['healthcare', 'medical'],
                notes: ['Very interested', 'Send proposal'],
                userId: janeSales.id,
            },
            {
                name: 'Retail Giant',
                company: 'Retail Giant Inc',
                website: 'https://retailgiant.com',
                region: 'IL',
                industry: 'Retail',
                platform: 'tiktok',
                source: 'social',
                status: 'CLOSED',
                emails: ['sales@retailgiant.com'],
                phones: ['5559876543'],
                keywords: ['retail', 'ecommerce'],
                notes: ['Deal closed successfully'],
                userId: admin.id,
            },
            {
                name: 'Education Academy',
                company: 'Education Academy',
                region: 'MA',
                industry: 'Education',
                platform: 'facebook',
                source: 'ads',
                status: 'NEW',
                emails: ['info@eduacademy.com'],
                phones: ['5551112222'],
                keywords: ['education', 'training'],
                notes: ['Needs more information'],
                userId: marketing.id,
            },
        ],
    });
    console.log('✅ Created 5 sample leads');
    const totalUsers = await prisma.user.count();
    const totalLeads = await prisma.lead.count();
    console.log(`\n🎉 Seeding completed!`);
    console.log(`   Users: ${totalUsers}`);
    console.log(`   Leads: ${totalLeads}`);
}
main()
    .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map