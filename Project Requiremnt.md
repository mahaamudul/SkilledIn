# EduManage — Project Requirements (Assignment 12)

## 📌 Project Overview & Objective
EduManage is a robust and user-friendly platform built using the **MERN stack** (MongoDB, Express.js, React, and Node.js). The platform is designed to revolutionize how educational institutions, tutors, and students interact, making skill learning and class management more efficient and accessible.

---

## 🛑 Key Rules & Constraints
* **GitHub Commits:**
  * Minimum of **20 notable commits** on the client side.
  * Minimum of **12 notable commits** on the server side.
* **Documentation (`readme.md`):** Must include the website name, Admin username/password, Live site URL, and at least **10 bullet points featuring website functionalities**.
* **Responsiveness:** Fully responsive across mobile, tablet, and desktop views (including all dashboards).
* **Private Routes:** After reloading a private route, the user must **not** be redirected to the login page.
* **Security:** Use environment variables to hide Firebase config keys and MongoDB credentials.
* **Content:** Absolutely **no** `Lorem ipsum` filler text allowed.
* **UX/UI Notifications:** Use custom alerts/toasts/notifications (e.g., SweetAlert2, React Hot Toast) for all CRUD operations, successful login, and registration. **Do not use default browser alerts.**
* **Data Fetching:** Implement **TanStack Query** for all data fetching functionalities (**GET** methods only).

---

## 🖥️ Core User Interface Components

### 1. Navbar
* **Logged Out State:** Logo + Website Name, Home, All Classes, Teach on [Website], and a **Sign In** button.
* **Logged In State:** The user's profile picture replaces the Sign In button.
* **Profile Dropdown:** Clicking the profile picture reveals a dropdown menu containing:
  * User Name *(non-clickable)*
  * Dashboard Link
  * Logout Button

### 2. Homepage Sections
* **Banner/Carousel:** High-quality, relevant images.
* **Partners/Collaborators:** Highlighting partner logos with a brief description of the partnership.
* **Popular Classes/Courses:** Highlights a few popular or highly recommended classes based on highest enrollment or highest reviews. *(Slider/Carousel highly recommended)*
* **Feedback Section:** A carousel displaying feedback collected from students. Each item must show:
  * Feedback text
  * Student Name & Image
  * Class Title
* **Platform Statistics Section:**
  * *Left Side:* Cards showing **Total Users**, **Total Classes** (approved/added), and **Total Enrollment**.
  * *Right Side:* A relevant platform graphic/image.
  * *Note:* Total classes are tracked from the teacher dashboard, and total enrollment is global across the system.
* **Teacher CTA Section:**
  * *Left Side:* Relevant image.
  * *Right Side:* Promotional text inviting users to become teachers with a **"Start teaching today"** button (redirects to the *Teach on [Website]* page).
* **Extra Content:** Add at least **two extra relevant sections** to the home page.

### 3. All Classes Page
* Displays all classes added by teachers that have been approved by the Admin.
* Displayed in a card format containing:
  * Title, Image, Short description, and Price.
  * Teacher's Name.
  * Total Enrollment count.
  * **Enroll Button** (Redirects to Class Details).

### 4. Class Details Page (Private Route)
* Accessible via route `/class/:id`.
* Shows complete details of the selected class (Teacher info, description, price, etc.).
* Contains a **Pay Button** which redirects to a secure payment integration wrapper.
* Upon successful payment, data is saved into a payment collection, and the user is redirected to `/dashboard/my-enroll`.

### 5. Teach on [Website] Page (Private Route)
* Form for users to apply for a teaching position:
  * Name & Profile Image (Auto-filled from logged-in user).
  * Email (Read-only).
  * Experience dropdown (Select from: *Beginner*, *Experienced*, *Mid-level*).
  * Request Title.
  * Category dropdown (Select from at least 5 categories using a HTML select element, e.g., Web Development, Digital Marketing).
  * **Submit for Review** button.
* *State Management Note:* Once submitted, the application goes to the Admin Dashboard. If rejected, the button transforms to allow re-submission. If approved, the user's role updates to "Teacher," the form disappears, and a relevant success message is displayed.

---

## 📊 Dashboards Layouts (Private Routes)

### 👥 Student Dashboard
> **Route Rule:** Defaults to a dashboard-specific layout. Newly registered users receive the `student` role by default.

#### A. My Enroll Class
* Displays all enrolled and paid classes in a card format showing:
  * Title, Image, and Teacher Name.
  * **Continue Button** (Redirects to individual enrollment details).
#### B. My Enroll Class Details (`/dashboard/myenroll-class/:id`)
* **Assignments Table:** Displays assignments assigned to this class by the teacher, containing: Title, Description, Deadline, and a **Submit Button**.
  * *Note:* Submitting an assignment increments the submission count for that class's assignment by 1.
* **Teaching Evaluation Report (TER):** A button located under the navbar that opens a modal allowing students to submit feedback:
  * Inputs: Description and Star Rating *(using a React rating component)*.
  * Data saves to a feedback collection and feeds back to the Home page carousel and Admin view.

---

### 👑 Admin Dashboard

#### A. Teacher Request Page
* Displays a data table of pending teacher requests:
  * Name, Image, Experience, Title, Category, and Status (*Pending*).
  * Actions: **Approve Button** & **Reject Button**.
  * *Note:* Approving updates the user's database role to `teacher`. Rejecting updates the status to `rejected`. Actions must be disabled once clicked.

#### B. Users Management Page
* Tabular view of all registered platform users:
  * User Name, Email, and Profile Image.
  * Action: **Make Admin Button** (Disabled if user is already an admin).
  * **Requirement:** Server-side search functionality to look up users via username or email.

#### C. All Classes Page
* Tabular view monitoring all added classes:
  * Title, Image, Teacher Email, and Short Description.
  * Actions: **Approve Button** (makes class live on the site) & **Reject Button** (updates status to *Rejected*).
  * Action: **See Progress Button** (Initially disabled; becomes active once approved. Clicking redirects to `/dashboard/class/:id` where Admin can read the class feedback).

---

### 👨‍🏫 Teacher Dashboard

#### A. Add Class Page
* A creation form requiring:
  * Title, Price, Description, and Class Banner Image.
  * Teacher Name & Email (Auto-filled, non-editable).
  * On submission, saves data to MongoDB as `pending` and redirects the teacher to the *My Class* page.

#### B. My Class Page
* Displays all classes uploaded by this specific teacher via cards showing: Title, Image, Price, Description, and Status (*Pending / Accepted / Rejected*).
* Actions:
  * **Update Button:** Opens a modal or route with an update form.
  * **Delete Button:** Prompts for confirmation before removing the class.
  * **See Details Button:** Enabled only if class status is *Accepted*. Redirects to `/dashboard/my-class/:id`.
    * **Class Progress Section:** Displays 3 statistical cards:
      1. *Total Enrollment Card* (Cumulative count of students enrolled).
      2. *Total Assignment Card* (Total assignments created for this class).
      3. *Per Day Assignment Submitted Card* (Sorted by current date).
    * **Class Assignment Creation:** Contains a **Create** button that triggers a modal containing fields for *Assignment Title*, *Deadline*, and *Description*. Creating an assignment increments the assignments card count by 1.

---

### 👤 Profile Route (Shared View)
* Available across all 3 dashboards. Must elegantly render the active user's details:
  * Name, Role, Image, Email, and Phone number.

---

## 🔐 Authentication System
* **Login Page:** Includes Email/Password inputs, **Google Sign-In**, and a link to the registration page.
* **Registration Page:** Form fields include Name, Email, Password, and PhotoURL.
* *Note:* Do **not** implement email verification or password reset links during the grading timeline to prevent examiner delay.
* Display explicit, contextual error messages for failing authentication checks.

---

## ⚡ Challenges Part
1. Implement **TanStack Mutation** for handling all database `POST` requests.
2. Utilize **React Hook Form** for managing and validating all form pages.
3. Secure applications using **JWT (JSON Web Tokens)** on login (Email/Password & Social), storing tokens securely in local storage.
4. Implement server-side **Pagination** on all data tables and card layouts (e.g., limiting user views to **10 users per page**).

---

## 🌟 Optional Tasks
1. **My Order Page (Student Dashboard):** Tabular overview showing Class Title, Price, Transaction ID, Teacher's Email, and an **Invoice Button** (Downloads transaction details as a PDF using `jsPDF`).
2. Add interaction transitions and UI animations using **Framer Motion** or **AOS**.
3. Implement an **Axios Interceptor** for seamless token handling and security validation headers.
4. Integrate a **Search Bar** inside the Navbar specific to the *All Classes* page.
5. Apply **Infinite Scroll** layout strategies on the *All Classes* page.

---

## 📤 Submission Format
When completing the assignment, ensure the following format is provided:
1. **Assignment Category/variant:** assignment12_category_0008
2. **Admin Email:** [Insert Email]
3. **Admin Password:** [Insert Password]
4. **Front-end Live Site Link:** [Insert Link]
5. **Client-Side GitHub Repository Link:** [Insert Link]
6. **Server-Side GitHub Repository Link:** [Insert Link]