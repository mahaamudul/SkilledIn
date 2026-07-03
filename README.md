# SkilledIn — Interactive Class Management Platform

SkilledIn is a robust educational platform built using the **MERN Stack** (MongoDB, Express, React, Node.js) and configured for comprehensive skill learning and class management. The application features functional dashboards for students, teachers, and system administrators.

## 🔑 Administrative Login Credentials
- **Admin Email/Username:** `admin@skilledin.com`
- **Admin Password:** `adminPassword123`

## 🖥️ Live Application Urls
- **Front-end Client Deployment:** [http://localhost:5173/](http://localhost:5173/)
- **Back-end API Server:** [http://localhost:5000/](http://localhost:5000/)

---

## 🚀 Key Platform Features & Functionalities

1. **Role-Based Auth (Firebase & JWT):** Email/password and Google social signup integration. Secure token tracking using authorization interceptors.
2. **Private Route Reload Resiliency:** Implements loading indicators to verify auth status on page refreshes, preventing unwanted login redirects.
3. **Dynamic Home Slide-Banner:** Custom slider controls showcasing learning badges and active mentor channels.
4. **Platform Statistics Counters:** Real-time metrics counting total registered users, approved courses, and total enrollments dynamically from MongoDB.
5. **Popular Class Highlights:** Queries approved courses, calculates enrollment numbers, and promotes the top trending classes on the homepage.
6. **Student Testimonials Carousel:** A responsive, interactive carousel pulling real rating logs and reviews submitted by graduates.
7. **Teach on SkilledIn Request Portal:** Direct user submission requests for teacher roles, featuring auto-filled credentials and status feedback.
8. **Student Enrollment and Payments:** Interactive class info layout connected to transaction checkouts. Saves billing metadata upon purchase.
9. **Student Coursework Submissions:** Integrated checklists tracking coursework tasks, deadlines, and submissions logs.
10. **Teaching Evaluation Report (TER):** Allows students to submit class feedback star ratings, dynamically synchronizing to the homepage.
11. **My Orders & PDF Receipts:** Detailed student billing log table with direct **PDF invoice downloads** generated on the client via `jsPDF`.
12. **Teacher Course Builders:** Custom forms for tutors to upload curriculum classes, edit descriptions, manage active listings, and delete draft entries.
13. **Class Statistics Dashboard:** Teacher metrics console rendering total student enrollments, total assignments, and submission count cards.
14. **Admin User Search Console:** Complete server-side search querying accounts using regex matching on names and emails.
15. **Admin Class Auditing:** A dashboard layout for admins to approve/reject class uploads and click "See Progress" to read student reviews.
