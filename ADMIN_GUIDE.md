# 🔧 Edirne Kırmızısı - Admin Panel Guide

## Admin Panel Overview

Complete guide for managing your e-commerce platform.

**Access:** `http://localhost:5173/admin/panel`

**Default Credentials:**
- Username: `admin`
- Password: `admin123`

⚠️ **Change these immediately after first login!**

---

## 📊 Dashboard Tab

### Key Metrics Overview

The dashboard provides at-a-glance business insights:

**Sales Metrics:**
- **Total Revenue** - All-time earnings
- **Today's Revenue** - Current day sales
- **Monthly Revenue** - Current month total
- **Average Order Value** - Revenue / orders

**Order Metrics:**
- **Total Orders** - All orders count
- **Pending Orders** - Awaiting processing
- **Processing Orders** - Currently being prepared
- **Shipped Orders** - Out for delivery
- **Completed Orders** - Successfully delivered

**Product Metrics:**
- **Total Products** - Inventory count
- **Low Stock Alerts** - Products below threshold
- **Out of Stock** - Items needing restock
- **Published Products** - Live on site

**Customer Metrics:**
- **Total Customers** - Registered users
- **New This Month** - Recent signups
- **Active Customers** - Recent purchases
- **Repeat Customers** - Multiple orders

### Charts & Graphs

**Sales Trend Chart:**
- View daily/weekly/monthly/yearly sales
- Compare periods
- Export data as CSV/PDF

**Top Products Chart:**
- Best sellers by revenue
- Best sellers by units sold
- Visual bar/pie charts

**Category Performance:**
- Sales by category
- Revenue distribution
- Stock levels by category

**Customer Growth:**
- New registrations over time
- Customer retention rate
- Geographic distribution

### Quick Actions

- Create new product
- View pending orders
- Check low stock items
- View recent reviews
- Access reports

---

## 📦 Inventory Tab

### Product Management

**Viewing Products:**
- Grid or list view
- Search by name/SKU
- Filter by category, stock, price
- Sort by various fields
- Bulk selection

**Adding New Product:**

1. Click **"Yeni Ürün Ekle"** button
2. Fill in required fields:
   - **Title** - Product name
   - **Category** - Select from dropdown
   - **Description** - Detailed product info
   - **Price** - In TL
   - **Stock Count** - Available quantity
   - **Trendyol URL** - Optional external link

3. **Upload Images:**
   - Drag & drop or click to upload
   - Multiple images supported
   - First image becomes main image
   - Recommended size: 1000x1000px
   - Formats: JPG, PNG, WebP
   - Max size: 10MB per image

4. Click **"Kaydet"** to publish

**Editing Products:**

1. Click product card or "Edit" icon
2. Update any field
3. Add/remove images
4. Click **"Güncelle"**
5. Changes live immediately

**Quick Stock Updates:**

- Use +/- buttons for quick adjustments
- Click stock number for manual input
- Bulk stock update available
- Low stock warnings appear automatically

**Deleting Products:**

1. Select product(s)
2. Click trash icon
3. Confirm deletion
4. ⚠️ Orders with this product retain data

**Bulk Operations:**

- Select multiple products (checkbox)
- Actions:
  - Bulk delete
  - Bulk category change
  - Bulk price update
  - Bulk stock adjustment
  - Export selected

### Category Management

**Adding Categories:**
1. Click **"Kategori Yönet"**
2. Enter new category name
3. Optional: Upload category image
4. Click **"Ekle"**

**Organizing Categories:**
- Rename existing categories
- Delete unused categories
- Merge categories
- Set category order

### Image Management

**Upload Manager:**
- View all uploaded images
- Delete unused images
- Rename files
- Bulk delete
- Storage usage indicator

**Image Optimization:**
- Auto-resize on upload
- Compression enabled
- WebP conversion (optional)
- CDN integration ready

---

## 🛍️ Orders Tab

### Order Management

**Order List View:**
- All orders displayed
- Filter by:
  - Status
  - Date range
  - Customer name
  - Order amount
  - Payment method

**Order Status Colors:**
- 🟡 **Yellow** - Pending
- 🔵 **Blue** - Processing
- 🟣 **Purple** - Shipped
- 🟢 **Green** - Delivered
- 🔴 **Red** - Cancelled

### Processing Orders

**Order Details:**
1. Click on order number
2. View:
   - Customer information
   - Shipping address
   - Ordered items with prices
   - Payment details
   - Order timeline
   - Customer notes

**Updating Order Status:**

1. Open order details
2. Click **"Durum Değiştir"** dropdown
3. Select new status:
   - **Processing** - Mark as being prepared
   - **Shipped** - Add tracking number
   - **Delivered** - Mark complete
   - **Cancelled** - Refund initiated

4. Optional: Add internal note
5. Click **"Güncelle"**
6. ✉️ Customer automatically emailed

**Adding Tracking Information:**

1. Update status to "Shipped"
2. Enter:
   - Courier company
   - Tracking number
   - Expected delivery date
3. Save changes
4. Customer receives email with tracking

**Handling Cancellations:**

1. Review cancellation request
2. Verify refund eligibility
3. Update order status to "Cancelled"
4. Process refund through payment gateway
5. Restock inventory automatically
6. Confirm with customer

### Order Actions

**Print Invoice:**
- Click printer icon
- PDF generated with:
  - Company details
  - Customer information
  - Itemized list
  - Tax calculation
  - Payment details

**Send Email:**
- Custom email to customer
- Order confirmation resend
- Shipping updates
- Custom messages

**Export Orders:**
- Export to CSV/Excel
- Custom date range
- Filter before export
- Include/exclude fields

### Order Notes

**Internal Notes:**
- Add private notes for team
- Track special handling
- Record customer calls
- Not visible to customers

**Customer Notes:**
- View notes from customer
- Special delivery instructions
- Gift messages
- Concerns or questions

---

## 👥 Customers Tab

### Customer Management

**Customer List:**
- All registered users
- Search by name/email/phone
- Filter by:
  - Registration date
  - Order count
  - Total spent
  - Last activity

**Customer Details:**

View for each customer:
- **Profile Information**
  - Name, email, phone
  - Registration date
  - Account status
  
- **Order History**
  - All orders placed
  - Total amount spent
  - Average order value
  - Return rate

- **Saved Addresses**
  - Billing addresses
  - Shipping addresses
  
- **Reviews Written**
  - Product reviews
  - Average rating given

- **Wishlist**
  - Saved items
  - Price drop alerts

**Customer Actions:**

- **Send Email** - Direct communication
- **View Orders** - Full order history
- **Block/Unblock** - Suspend account
- **Reset Password** - Help customer access
- **Add Note** - Internal memo

### Customer Analytics

**Customer Segments:**
- **VIP** - High-value customers (>10,000 TL spent)
- **Regular** - 3+ orders
- **New** - First order only
- **Inactive** - No orders 6+ months

**Lifetime Value:**
- Calculate customer LTV
- Identify high-value customers
- Target retention campaigns

**Bulk Communications:**
- Email selected customers
- Segment-based campaigns
- Personalized offers

---

## 📝 Content Tab

### Page Management

**Editing Pages:**

**Home Page:**
- Hero carousel slides
- Featured products section
- Promotional banners
- Announcement bar

**About/Story Page:**
- Company history
- Mission statement
- Team members
- Awards & certifications

**Contact Page:**
- Contact information
- Business hours
- Google Maps integration
- Social media links

### Blog Management

**Creating Blog Posts:**

1. Click **"Yeni Yazı"** button
2. Fill in:
   - **Title** - Post title
   - **Slug** - URL-friendly name
   - **Content** - Rich text editor
   - **Excerpt** - Short summary
   - **Featured Image** - Main image
   - **Category** - Blog category
   - **Tags** - Keywords
   - **Author** - Your name
   - **Status** - Draft/Published

3. **SEO Settings:**
   - Meta title
   - Meta description
   - Keywords

4. Click **"Yayınla"** to publish

**Managing Posts:**
- Edit existing posts
- Schedule future posts
- Unpublish posts
- Delete posts
- View analytics

### Media Library

- All uploaded files
- Organized by type
- Search functionality
- Bulk management
- Storage statistics

---

## 📣 Marketing Tab

### Coupon Management

**Creating Coupons:**

1. Click **"Yeni Kupon Oluştur"**
2. Configure:
   - **Code** - Unique coupon code
   - **Description** - Internal note
   - **Discount Type:**
     - Percentage (10%, 20%)
     - Fixed Amount (50 TL, 100 TL)
   - **Discount Value** - Amount/percentage
   - **Minimum Order** - Optional threshold
   - **Maximum Discount** - Cap for percentage
   - **Usage Limit** - Total uses allowed
   - **Per User Limit** - Uses per customer
   - **Expiration Date** - When it expires
   - **Status** - Active/Inactive

3. Click **"Oluştur"**

**Coupon Strategies:**
- **Welcome10** - New customer discount
- **SUMMER20** - Seasonal promotion
- **BULK50** - Minimum order incentive
- **VIP100** - High-value customer reward

**Tracking Coupons:**
- Usage statistics
- Revenue impact
- Customer segments using
- ROI calculation

### Email Campaigns

**Newsletter Management:**

**Subscribers:**
- View all subscribers
- Export list
- Segment by behavior
- Remove bounced emails

**Creating Campaign:**
1. Select template
2. Customize:
   - Subject line
   - Preview text
   - Email body
   - Images
   - Call-to-action buttons
3. Select audience segment
4. Schedule or send immediately
5. Track:
   - Open rate
   - Click-through rate
   - Conversions
   - Revenue generated

**Automated Emails:**

Configure automatic emails for:
- **Welcome Email** - New signups
- **Order Confirmation** - Purchase complete
- **Shipping Updates** - Order status changes
- **Review Requests** - Post-delivery
- **Abandoned Cart** - Reminder email
- **Win-back** - Inactive customers

### Reviews & Ratings

**Review Moderation:**

**Pending Reviews:**
1. Read customer review
2. Check for:
   - Appropriate language
   - Genuine feedback
   - No spam/abuse
3. Actions:
   - **Approve** - Publish review
   - **Reject** - Delete with reason
   - **Flag** - Mark for further review
   - **Respond** - Add admin response

**Featured Reviews:**
- Pin best reviews
- Show on homepage
- Use in marketing

**Review Incentives:**
- Email review requests
- Discount for reviews
- Loyalty points

---

## 📊 Reports Tab

### Sales Reports

**Revenue Reports:**
- Daily sales breakdown
- Weekly comparisons
- Monthly trends
- Yearly overview
- Custom date range

**Export Formats:**
- PDF - Formatted report
- CSV - Data analysis
- Excel - Detailed spreadsheet

**Report Types:**

**1. Sales Summary:**
- Total revenue
- Order count
- Average order value
- Refunds/cancellations

**2. Product Performance:**
- Top sellers
- Worst performers
- Profit margins
- Stock turnover

**3. Customer Analytics:**
- New vs. returning
- Customer lifetime value
- Geographic distribution
- Acquisition sources

**4. Tax Report:**
- KDV calculations
- Taxable revenue
- Tax by category
- Export for accountant

### Inventory Reports

**Stock Reports:**
- Current inventory levels
- Low stock alerts
- Out of stock items
- Overstock items
- Stock value

**Stock Movement:**
- Products sold
- Restocks performed
- Returns processed
- Damaged/lost items

### Financial Reports

**Income Statement:**
- Revenue
- Cost of goods sold
- Operating expenses
- Net profit

**Cash Flow:**
- Incoming payments
- Refunds processed
- Payment gateway fees
- Net cash flow

---

## ⚙️ Settings

### General Settings

**Store Information:**
- Store name
- Logo upload
- Contact email
- Phone number
- Address
- Tax ID

**Currency & Units:**
- Currency (TL)
- Weight unit
- Dimension unit

**Time Zone:**
- Set local timezone
- Date format
- Time format

### Payment Settings

**Payment Methods:**
- Credit/Debit cards
- Bank transfer
- PayPal
- Iyzico integration
- PayTR integration

**Payment Configuration:**
- API keys
- Merchant ID
- Test/Production mode
- Currency
- Auto-capture

### Shipping Settings

**Shipping Zones:**
- Define regions
- Set shipping costs
- Free shipping threshold
- Estimated delivery times

**Courier Integration:**
- Aras Kargo API
- MNG Kargo API
- PTT Cargo API
- Auto tracking updates

### Email Settings

**SMTP Configuration:**
- Email server
- Port
- Username/Password
- From name
- From email

**Email Templates:**
- Customize templates
- Add branding
- Personalization tags
- Preview before sending

### Security Settings

**User Management:**
- Add admin users
- Set permissions
- Role-based access
- Activity logging

**Two-Factor Authentication:**
- Enable 2FA
- Recovery codes
- SMS or app-based

**Backup:**
- Auto-backup schedule
- Manual backup
- Download backups
- Restore from backup

---

## 🚨 Common Tasks

### Daily Tasks
- [ ] Check pending orders
- [ ] Process new orders
- [ ] Review low stock alerts
- [ ] Moderate new reviews
- [ ] Respond to customer messages
- [ ] Check dashboard metrics

### Weekly Tasks
- [ ] Analyze sales trends
- [ ] Update product descriptions
- [ ] Check coupon performance
- [ ] Review customer feedback
- [ ] Plan marketing campaigns
- [ ] Inventory audit

### Monthly Tasks
- [ ] Generate financial reports
- [ ] Evaluate product performance
- [ ] Customer satisfaction survey
- [ ] Update blog content
- [ ] Review pricing strategy
- [ ] Backup database

---

## 🆘 Troubleshooting

### Common Issues

**Orders Not Showing:**
- Refresh browser
- Check filter settings
- Clear cache
- Check date range

**Images Not Uploading:**
- Check file size (<10MB)
- Verify file format
- Check internet connection
- Try different browser

**Email Not Sending:**
- Verify SMTP settings
- Check spam folder
- Verify email addresses
- Test email configuration

**Payment Gateway Error:**
- Verify API credentials
- Check test/production mode
- Contact payment provider
- Review error logs

---

## 📞 Support & Help

**Technical Support:**
- Email: admin-support@edirnekirmizisi.com
- Phone: +90 XXX XXX XX XX
- Live Chat: Available in admin panel

**Resources:**
- Video tutorials
- Knowledge base
- Community forum
- API documentation

---

## 🔒 Security Best Practices

1. **Change default admin password immediately**
2. **Enable two-factor authentication**
3. **Use strong, unique passwords**
4. **Limit admin user accounts**
5. **Regular security audits**
6. **Keep software updated**
7. **Monitor login attempts**
8. **Regular backups**
9. **Use HTTPS only**
10. **Review user permissions regularly**

---

## 📈 Growth Tips

**Increase Sales:**
- Run targeted promotions
- Email marketing campaigns
- Social media engagement
- SEO optimization
- Customer reviews
- Cross-sell & upsell
- Loyalty programs

**Improve Operations:**
- Automate repetitive tasks
- Optimize inventory levels
- Streamline fulfillment
- Fast customer support
- Analytics-driven decisions
- Regular staff training

---

**Need Help?**

Contact admin support anytime:
- **Email:** admin-support@edirnekirmizisi.com
- **Phone:** Available 24/7
- **Chat:** In-panel support

---

*Edirne Kırmızısı Admin Panel v2.0*
