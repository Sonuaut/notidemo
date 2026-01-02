import React from "react";
import Navbar from "@/components/landingpage/Navbar";
import Footer from "@/components/landingpage/Footer";

// Animated glowing circle component
const GlowingCircle = ({ className, style }:{
    className:any,style?:any
}) => (
  <div
    className={`absolute rounded-full blur-3xl opacity-40 animate-pulse ${className}`}
    style={style}
  />
);

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar  />
      <div className="relative min-h-screen py-12 px-2 md:px-0  overflow-hidden">
        {/* Animated/Glowing Decorative Circles */}
        <GlowingCircle className="top-0 left-0 w-64 h-64 bg-gradient-to-br from-indigo-400 via-purple-300 to-pink-300" />
        <GlowingCircle className="bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-emerald-200 via-indigo-200 to-pink-200" />
        <GlowingCircle
          className="top-1/2 left-1/2 w-40 h-40 bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200"
          style={{ transform: "translate(-50%, -50%)" }}
        />

        <div className="max-w-5xl mx-auto  backdrop-blur-md rounded-3xl  p-6 md:p-12  relative z-10">
          <h1 className="text-5xl font-extrabold mb-6 text-center bg-gradient-to-r from-indigo-600 via-purple-500 to-emerald-500 bg-clip-text text-transparent drop-shadow-lg animate-gradient-x">
            Privacy Policy
          </h1>
          <p className="mb-8 text-center text-lg text-gray-700">
            <strong>Effective Date:</strong> June 18, 2025
          </p>

          {/* Overview */}
          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h2 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-700 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              Overview
            </h2>
            <p className="mb-3 text-gray-800">
            Notifly is a digital communication tool developed for K–12 schools and educational
organizations to simplify and enhance communication between school staff and families.
The platform provides access to messaging features, contact tools, and customizable
notification systems across various plan levels. Schools and districts use Notifly to
streamline everyday communication and promote greater family engagement, academic
support, and real-time updates within their learning communities. These services,
collectively referred to as the <strong>“Services”</strong> or the <strong>“Platform,”</strong> are provided on a subscription
basis and are accessible via our web-based platform, <a className="text-[#0015ff]" target="_blank" href="https://mynotifly.com">https://mynotifly.com</a> (the
“<strong>Website</strong>”), and the mobile application “Notifly” (the “<strong>App</strong>”). 
            </p>   
          </section>

          {/* Our Privacy Commitment */}
          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#b4f0e0]/80 via-[#e0d9ff]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-emerald-300">
            <h2 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-emerald-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
              Our Privacy Commitment
            </h2>
            <p className="mb-3 text-gray-800">
              The Services are operated by Notifly LLC (referred as “<strong>Notifly,” “Company,” “we,” “us,”</strong> or <strong>“our”</strong>).<br />
             At Notifly, we recognize that protecting your privacy is essential. We are committed to
safeguarding the information shared by schools, districts, educators, and families who use
our Platform. This includes both the organizations that subscribe to our Services and the
individuals whose information may be managed or accessed through the Platform.
            </p>
            <p className="mb-3 text-gray-800">
              Notifly is dedicated to transparency in how we collect, use, and
              handle personal data. This Privacy Policy outlines the practices
              and protections that apply to all features and services offered by
              Notifly.
            </p>
          </section>

          {/* Data Scope and Agreements */}
          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
            <h2 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              Data Scope and Agreements
            </h2>
            <p className="mb-3 text-gray-800">
             This Privacy Policy outlines in detail how we collect, use, protect, and disclose personal
information when you interact with our Services. The Services include the App, our
Website, and all features, content, and functionality that we make available through the
Services. Whenever we use the terms “user,” “you,” or “your,” we mean any individual who
downloads, accesses, or uses our App, visits our Website, or otherwise engages with our
Services.<br />
For the purposes of this Privacy Policy, “personal data” means any information that relates
to an identified or identifiable individual, including information that can directly or
indirectly identify a person. This includes data defined as “personal information” under
applicable laws.<br />
This Privacy Policy applies to personal data we collect:
            </p>
            <ul className="list-disc list-inside space-y-1 mb-3 ml-2">
              <li className="mb-2">
               On the App or through the Website.
              </li>
                <li className="mb-2">
                 Through any account you create via the Platform.
                </li>
                <li className="mb-2">
                 When you opt in for electronic messages and/or SMS between you and us or other
users of the Platform, as applicable.
                </li>
            </ul>
            <p className="mb-3 text-gray-800">Notifly may act in different capacities when processing personal data:</p>
            <h6 className="font-semibold">(i) Data Controller</h6>
            <p className="mb-3 text-gray-800">
             Notifly acts as a data controller when you voluntarily provide personal information - such
as when you create an account on the Platform, visit our Website, or communicate with us
through other channels - or when we automatically collect certain technical and usage
information related to your interactions with our Services. In this capacity, Notifly
determines the purposes and means of processing such data.
            </p>
            <h6 className="font-semibold">(ii) Data Processor</h6>
            <p className="mb-3 text-gray-800">
             Notifly acts as a data processor when schools, districts, or educational institutions
(collectively, “Customers”) use our Services to process personal data of students, parents,
or guardians in connection with their educational and administrative purposes, as defined
under the applicable agreement between Notifly and each institution (the “Institution
Agreement”). In such cases, Notifly processes Personal Data solely on behalf of and under
the lawful instructions of the Customer, in accordance with the Customer Data Processing
Agreement, which forms an integral part of our Terms of Service.
            </p>
            <p className="mb-3 text-gray-800">
             Please note that this Privacy Policy does not extend to third-party websites, tools, or
services that are not owned or controlled by Notifly - even if those providers assist in
delivering aspects of the Platform. However, third-party vendors working with Notifly are
required to maintain privacy and security protections that are consistent with Notifly’s
standards and legal obligations.
            </p>
            <p className="mb-3 text-gray-800">This Privacy Policy does not also apply to information collected by Notifly through any
other means, including on any other website or app operated by Notifly LLC.</p>
<p className="mb-3 text-gray-800">We also encourage you to review our Terms of Service, which outline additional
responsibilities and conditions for using the Platform.</p>
          </section>

          {/* What Information Notifly Collects */}
          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/60 to-[#b4f0e0]/60 p-6 shadow-md">
            <h2 className="text-2xl font-bold text-indigo-700 mb-3">
              What Information Notifly Collects
            </h2>
            <p className="mb-3 text-gray-800">Below is a clear overview of the categories of personal information we collect and the
specific types of data included in each category.</p>
            <ul className="list-disc list-inside space-y-3 mb-3 ml-2">
              <li className="mb-2">
                <span className="font-semibold">
                  Contact Information: 
                </span> Full name, phone number, email address.
              </li>
              <li className="mb-2">
                <span className="font-semibold">
                  User Content:
                </span> Any user-provided information that may include,
                  but are not limited to:
                  <ul>
                    <li className="mb-2">Profile images or photographs (optional).</li>
                    <li className="mb-2">Text message bodies and email bodies created and sent through the Platform.</li>
                    <li className="mb-2">Subject lines, recipient addresses, and other communication metadata such as timestamps and delivery status linked to user communications</li>
                    <li className="mb-2">Stored message logs or delivery receipts, which may be retained temporarily for reliability, troubleshooting, or compliance purposes.</li>
                  </ul>
              </li>
              <li className="mb-2">
                <span className="font-semibold">Communications Usage Data:</span> 
                <ul>
                  <li className="mb-2">Records of message events (sent, delivered, opened, bounced).</li>
                  <li className="mb-2">Metadata such as message origin, destination (phone numbers, email addresses), date, time, delivery status, and error codes.</li>
                  <li className="mb-2">IP address and device identifiers (technical identifiers linked to communication activity).</li>
                  <li className="mb-2">System activity logs (diagnostics, delivery trace, spam filter data).</li>
                </ul>
              </li>
              <li className="mb-2">
                <span className="font-semibold">Transaction Data:</span>  Subscription details (product IDs, purchase tokens,
renewal status, expiration dates). Purchases are handled through our Website by Stripe. Their own terms and privacy policies apply. You will need to provide payment details to complete a purchase.
              </li>
              <li className="mb-2">
                <span className="font-semibold">Diagnostics Data:</span> Crash logs, performance metrics (e.g., launch time,
hang rate, energy usage), device type, operating system version.
              </li>
              <li className="mb-2">
                <span className="font-semibold">Cookies and Other Tracking Technologies:</span> Cookies, web beacons, pixels, SDKs, and local
storage used to recognize your browser or device, remember preferences, analyze usage patterns, and measure communication effectiveness. This may
include IP address, device information, session identifiers, and browsing activity on the Website or App.
              </li>
            </ul>
            <p className="mb-3 text-gray-800">
              Please do not send sensitive information (such as social security numbers, racial or ethnic
details, political opinions, religious beliefs, health information, criminal records, or trade
union membership, etc.) when contacting us.<br /><br />
We do not request, collect, or store any special categories of personal data. In particular, we
do not transmit or process school transcripts, class lists, course schedules, disciplinary
records, or any medical or health-related information of data subjects through the Platform.

            </p>
          </section>

          {/* Information Provided by Your School or District */}
          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#b4f0e0]/60 to-[#e0d9ff]/60 p-6 shadow-md">
            <h2 className="text-xl font-semibold text-indigo-700 mb-2">
              How Notifly Collects Personal Information
            </h2>
            <p className="mb-3 text-gray-800">
              All personal data collected and processed by Notifly falls into the following categories:
            </p>
            <ul className="list-disc list-inside space-y-3 mb-3 ml-2">
              <li className="mb-2">
                <span className="font-semibold">Information You Provide to Notifly:</span> Notifly collects and stores information you voluntarily provide while using the Platform.
This includes Contact Information you submit when signing up for our Services or opting in
to receive messages as part of the Platform’s functionality.<br />
This information may be used to validate your identity, enable relevant notifications from
teachers, schools, or affiliated organizations, and facilitate administrative management
within your school or district.<br />
Depending on the features available in your account, you may also choose to enrich your
profile with optional details, such as professional background, skills, interests, or areas
where you’d like to contribute. Any optional information you provide may be visible to
authorized users within your school or district, depending on their role and permissions.<br />
You are not required to provide all of this information to use Notifly, but choosing not to
share certain details may limit access to specific features or targeted communications
                </li>
              <li className="mb-2">
                <span className="font-semibold">Information We Collect and Process When You Use our Services:</span> In addition to the personal information you provide directly, we automatically collect
certain technical and usage details about your interactions with our Services. This
information helps us enhance functionality, ensure reliability, and improve user experience.
                <ul className="mt-3">
                  <li className="mb-2">
                     <span className="font-semibold">Communications Usage Data:</span> Certain technical information is automatically
collected when interacting with our emails or messages. This may include sender
and recipient email addresses, message timestamps, delivery status, IP addresses,
and related diagnostic logs. This information is used solely to ensure reliable message delivery, prevent spam or abuse, monitor communication performance, and maintain system security
                  </li>
                    <li className="mb-2">
                     <span className="font-semibold">Diagnostics Data:</span> We may collect crash logs, performance metrics (e.g., launch
time, hang rate, energy usage), device type, operating system version, and similar
technical data. This information is used to monitor, debug, and improve the stability
and performance of our App</li>
                </ul>
</li>
              <li className="mb-2">
                 <span className="font-semibold">Information We Collect and Process via Cookies and Other Tracking Technologies:</span> We and our service providers may use cookies and similar technologies (such as web
beacons, pixels, SDKs, and local storage) to operate our App and Website, enhance user
experience, analyze usage, and improve performance.
These technologies help us remember your preferences, understand how you interact with
our communications, and measure the effectiveness of our Services. For example, we may
use tracking pixels in emails sent through our service providers (such as SendGrid) to
determine whether messages have been opened or links have been clicked. You can manage
or disable cookies through your browser or device settings, though some features may not function properly if you do so. 
              </li>
            </ul>
          </section>

          {/* Cookies and Other Tracking Technologies */}
          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/60 to-[#e0d9ff]/60 p-6 shadow-md">
            <h2 className="text-xl font-semibold text-indigo-700 mb-2">
              Cookies and Other Tracking Technologies
            </h2>
            <p className="mb-3 text-gray-800">
              When you visit our Website, sign up for an account, or receive emails from us, Notifly and
our service providers automatically collect certain information using tracking technologies
such as cookies and tracking pixels.<br /><br />
A cookie is a small text file that stores information about your browsing activity and
interactions with a website. When you revisit our Website, cookies allow us to recognize
your browser and provide a more efficient and personalized experience.<br /><br />
First-party cookies are cookies set directly by Notifly. Third-party cookies are set by
external parties that provide functionality or analytics through our Platform (for example,
usage analytics). These third parties may recognize your device both when you visit our
Website and when you visit other sites that use their technologies.</p>
<h6 className="font-semibold mb-3">Types of Cookies Notifly Uses</h6>
<p className="mb-3 text-gray-800">Notifly uses both first-party and third-party cookies, including persistent and session
cookies:</p>
            <ul className="list-disc list-inside space-y-1 mb-3 ml-4">
              <li className="mb-2">Persistent cookies remain on your device for a defined period of time or until you
delete them. They help us remember your preferences and personalize your experience on future visits.</li>
              <li className="mb-2">Session cookies are temporary and deleted when you close your browser. They are
used to manage active sessions — for example, keeping you signed in as you navigate between pages.</li>
            </ul>
            <h6 className="font-semibold mb-3">How Notifly Uses Cookies</h6>
<p className="mb-3 text-gray-800">We use cookies for several purposes. Some are strictly necessary for our Website to
function, while others help us understand usage patterns, improve performance, and deliver a better user experience.</p>
            <p className="mb-3 text-gray-800">
             Essential cookies – These cookies are required for our Website to operate correctly
and provide core functionality. Because they are necessary, they cannot be disabled
through cookie settings.            </p>
            <p className="mb-3 text-gray-800">
              Functionality cookies – These cookies enhance usability by remembering user preferences or enabling advanced features. Without them, certain functionality maybe limited.</p>
            <p className="mb-3 text-gray-800">
              Analytics cookies – These cookies collect aggregated information to help us
understand how users interact with our Website, measure the effectiveness of communications and campaigns, and improve the overall user experience.</p>

<h6 className="font-semibold mb-2">Managing Cookies</h6>
<p className="mb-3 text-gray-800">You can opt out of most non-essential cookies by adjusting your browser or device settings.
Most browsers allow you to accept or reject cookies, delete existing cookies, or be notified
when a new cookie is placed on your device. Please refer to your browser’s help menu for
specific instructions.<br />
If you disable or block cookies, some portions of our Website or Services may not function
as intended.<br />
If you have questions about how we or our third-party partners use cookies or tracking
technologies, you may contact us at  <a className="text-[#0015ff]" target="_blank" href="privacy@mynotifly.com">privacy@mynotifly.com</a>.
</p>
<h6 className="font-semibold mb-3">Other Tracking Technologies</h6>
<p className="mb-3 text-gray-800">In addition to cookies, Notifly and our service providers (such as SendGrid and Twilio) may
use other tracking technologies — including clear gifs, web beacons, or tracking pixels — to
better understand how our communications and Services are used.<br />
For example, we use pixels in emails sent via SendGrid to determine whether messages
have been opened or links have been clicked. This helps us measure the effectiveness of our
communications, monitor message deliverability, and maintain reliable service
performance.<br />
These technologies collect limited information such as email addresses, timestamps, IP
addresses, and device data related to message activity.
</p>
          </section>

          {/* How Notifly Handles Children's Personal Data */}
          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/60 to-[#b4f0e0]/60 p-6 shadow-md">
            <h2 className="text-xl font-semibold text-purple-600 mb-2">
              How Notifly Handles Children's Personal Data
            </h2>
            <p className="mb-3 text-gray-800">
              Notifly is committed to protecting the privacy of all users — especially children under the
age of thirteen (13). We comply fully with the Children’s Online Privacy Protection Act
(COPPA) and process, store, and use children’s personal data only when permitted by law
and with proper consent.</p>
            <p className="mb-3 text-gray-800">
              Notifly does not knowingly request, collect, or market to individuals under thirteen (13)
years of age, nor do we knowingly sell any personal information relating to minors.</p>
            <p className="mb-3 text-gray-800">
              Notifly operates as a service provider to schools and districts and processes student data
solely under their authorization and direction, in compliance with COPPA, FERPA, and other
applicable education privacy laws and regulations. The Platform is intended for use by
authorized school or district personnel and their designated users only.</p>
            <p className="mb-3 text-gray-800">
             Children under thirteen (13) are not permitted to create accounts or directly submit
personal data through the Platform. Any processing of student personal information —
including, but not limited to, name, contact details, or any other identifiable data — is
performed only under the written instructions of the educational institution and solely for
the purpose of enabling the Platform’s functionality and supporting secure, authorized
communication between users and students parents, in accordance with our <strong>Institution
Agreement</strong> and <strong>Customer Data Processing Agreement.</strong></p>
            <p className="mb-3 text-gray-800">
              If you believe that a minor under thirteen (13) has provided personal data to us without
appropriate consent, please contact us at <a className="text-[#0015ff]" target="_blank" href="privacy@mynotifly.com">privacy@mynotifly.com</a> so we can investigate and remove the information if necessary.</p>
            <p className="mb-3 text-gray-800">If we become aware that we have inadvertently collected data from a child under thirteen
(13) outside of our agreements with a school or district, or without proper authorization,
we will promptly delete the data, deactivate any related accounts, and remove the
information from our systems as quickly as reasonably possible.</p>
            <p className="mb-3 text-gray-800">Parents or guardians who have questions about their child’s data, or who wish to modify or
delete it, should contact their child’s school or district directly. Notifly will coordinate with
the educational institution to honor such requests in compliance with applicable privacy
laws and contractual obligations.</p>
          </section>

          {/* How Notifly Uses Your Information */}
          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/60 to-[#b4f0e0]/60 p-6 shadow-md">
            <h2 className="text-2xl font-bold text-indigo-700 mb-3">
             How Notifly Uses Personal Information
            </h2>
            <p className="mb-3 text-gray-800">
              At Notifly, protecting your privacy is a top priority. Any personal information you share with
or that we collect is used solely to operate, maintain, and improve our Services. Below are
the primary ways your information may be used:</p>
            <ol className="list-decimal list-inside space-y-3 mb-3 ml-4">
              <li className="mb-2">
                <span className="font-semibold">
                 User Account Management
                </span> We collect and process personal data to create, maintain, and manage user accounts for
authorized school and district staff, including user authentication, access control, and
account configuration.</li>
              <li className="mb-2">
                <span className="font-semibold">Communication with Users:</span>{" "}
                We may contact you with important updates, announcements, or
                reminders relevant to your use of the platform or based on
                school or district activity. These communications may appear
                within the app, via email, or through SMS
                notifications—depending on your preferences and the urgency of
                the message.
              </li>
              <li className="mb-2">
                <span className="font-semibold">
                  Service Operations and User Support:
                </span> Notifly uses the information it collects to deliver core features, facilitate communication
between schools and parents, provide technical support, and ensure reliable functionality
across its Platform. We also analyze how users interact with the Services to identify
improvements and measure effectiveness.</li>
              <li className="mb-2">
                <span className="font-semibold">
                  Communication with Users:
                </span> We may contact you with important updates, announcements, or reminders related to your
use of the Platform or school or district activities. These communications may appear
within the App, via email, or through SMS notifications, depending on your preferences and
permissions.</li>
          <li className="mb-2">
                <span className="font-semibold">
                   Customer Support:
                </span> We use personal data to provide technical or administrative support, respond to inquiries, and resolve user issues efficiently</li>
                <li className="mb-2">
                <span className="font-semibold">
                   District Reporting and Insight:
                </span> Aggregated information may be used to generate reports for our Customers. These reports
help administrators assess how effectively the Platform supports their communication goals and identify areas for improvement.</li>
                <li className="mb-2">
                <span className="font-semibold">
                   Security and Authentication:
                </span> We use personal data to verify user identities, maintain account integrity, and protect the
Platform from unauthorized access or misuse.</li>
                <li className="mb-2">
                <span className="font-semibold">
                  Legitimate Business Interests:
                </span> We may process automatically collected
information to support our legitimate operational interests, including:
          <ul className="mt-3 list-disc pl-6">
            <li className="mb-2">System Performance and Maintenance: Monitoring, analyzing, and improving
          Platform performance.</li>
            <li className="mb-2">Security: Detecting, preventing, and responding to fraud, cyberattacks,
          identity theft, and unauthorized access.</li>
            <li className="mb-2">Usage Trends: Understanding which features are most frequently used to
          enhance user experience and prioritize development.</li>
          </ul>
</li>
                    <li className="mb-2">
                <span className="font-semibold">
                   Legal Compliance and Recordkeeping:
                </span>  We process personal data to comply with
applicable laws, regulations, and contractual obligations — including requirements
under the Family Educational Rights and Privacy Act (FERPA). This may include
responding to lawful requests from courts or law enforcement authorities, resolving
legal disputes, and maintaining records consistent with regulatory and industry standards.</li>
                <li className="mb-2">
                <span className="font-semibold">
                  Consent-Based Processing:
                </span> In certain cases, we process personal information
based on explicit user consent — for example, when obtaining parental permission
to receive academic progress updates or SMS notifications from Customers via the
Platform. Such processing purposes will always be clearly described at the time
consent is requested.</li>
            </ol>
          </section>

          {/* Email and SMS Notifications */}
          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#b4f0e0]/60 to-[#e0d9ff]/60 p-6 shadow-md">
            <h2 className="text-xl font-semibold text-emerald-600 mb-2">
              Email and SMS Notifications
            </h2>
            <p className="mb-3 text-gray-800">
             If you have provided an email address or phone number, Notifly may send you important
administrative or service-related messages — such as alerts, updates, or confirmations —
on behalf of your school or district. In some cases, these communications may also include
relevant summaries or reminders tailored to your role or notification preferences.
            </p>
            <p className="mb-3 text-gray-800">
             By maintaining a Notifly account and not opting out, you acknowledge and agree that you
may receive messages via email or SMS from school staff, administrators, Notifly, and
authorized service providers. Depending on your mobile service plan, standard data or
messaging rates may apply; these charges are your responsibility.</p>
            <p className="mb-3 text-gray-800">
              You can opt out of most non-critical messages at any time by clicking the unsubscribe link
included in the communication or by adjusting your notification preferences within your
account settings. To permanently stop receiving SMS messages, simply reply “STOP” to any
Notifly text.</p>
            <p className="mb-3 text-gray-800">
              Please note that certain essential or legally required communications (such as account
security alerts or service interruptions) may still be sent even if you opt out of optional
notifications.</p>
          </section>

          {/* How Notifly Shares Personal Information */}
          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/60 to-[#e0d9ff]/60 p-6 shadow-md">
            <h2 className="text-xl font-semibold text-purple-600 mb-2">
              How Notifly Shares Personal Information
            </h2>
            <p className="mb-3 text-gray-800">
             Notifly uses personal data provided by users solely to deliver and improve the Services we
offer. We do not sell, rent, or trade your personal information.</p>
            <p className="mb-3 text-gray-800">
             We disclose data only in accordance with the Family Educational Rights and Privacy Act
(FERPA) and other applicable privacy laws, in the following circumstances:</p>
 <ul className="list-disc list-inside space-y-1 mb-3 ml-2">
  <li>When required by law, regulation, or valid legal process (e.g., court orders or law
enforcement requests).</li>
<li>To operate and maintain the Platform’s technical infrastructure and core
functionality.</li>
<li>To enforce our Terms of Service or other applicable service agreements, including
those with our Customers.</li>
<li>To protect the rights, safety, or property of Notifly, its users, or the public</li>
 </ul>
 <ol className="list-decimal list-inside space-y-3 mb-3 ml-2">
  <li>
    <span className="font-semibold">Third-Party Service Providers:</span> Notifly partners with carefully selected third-party providers to support the functionality, delivery, and maintenance of the Platform. These partners may assist with:   
    <ul className="list-disc list-inside space-y-1 mb-3 ml-4 mt-2">
      <li>Customer support and communication tools;</li>
      <li>Analytics services to improve usability and performance;</li>
      <li>Notification delivery (email, SMS, and push messages);</li>
      <li>Web and application hosting infrastructure.</li>
       <p className="mb-3 text-gray-800">Before sharing any personal data, Notifly ensures that each third-party provider maintains
robust privacy and security standards, equal to or exceeding those we uphold ourselves.</p>
  <p className="mb-3 text-gray-800">Notifly does not share personal information with any individual or entity that is not legally
authorized to access it under FERPA, applicable state privacy laws, or contractual obligations.</p>
  <p className="mb-3 text-gray-800">A list of critical third-party vendors (e.g., AWS, Twilio, Freshworks) — including links to
their privacy and security policies — is maintained and made available upon request.</p>
  <p className="mb-3 text-gray-800">All vendors handling student data are contractually bound to comply with FERPA, COPPA,
District Acceptable Use requirements, and relevant state and local regulations</p>
    </ul>
      </li>
  <li>
    <span className="font-semibold">Schools and Districts:</span> We may share personal data with authorized representatives of our Customers, such as
school or district administrators, to facilitate staff onboarding, account approval, and the
ongoing management of educator access within the Platform.<br />
This access is governed by our Terms of Service and Institution Agreement with the
Customer and limited to authorized educational purposes.
 </li>
 <li><span className="font-semibold">Legal and Regulatory Compliance:</span> We may disclose personal information when required or permitted by applicable law. Such disclosure may occur to:
 <ul className="list-disc ml-4 mt-1">
  <li>Comply with legal obligations;</li>
  <li>Protect the rights, safety, or property of our users or the public; or</li>
  <li>Respond to lawful requests, orders, or directives from courts, law enforcement
agencies, or regulatory authorities — including those located outside your country
of residence.</li>
 </ul>
 </li>
 <li><span className="font-semibold">Corporate Change and Data Transfers:</span> In the event of a corporate transaction (such as a merger, acquisition, reorganization, or sale of assets), personal data may be transferred as part of that process.<br />
Should such a transfer occur, Notifly will provide advance notice and, where required by
law, offer you the opportunity to opt out of continued use or transfer of your personal data
under new ownership.</li>
<li><span className="font-semibold">Professional Advisors and Consultants:</span> We may share limited data with our legal counsels, tax advisors, auditors, insurers, or other professional consultants as necessary to obtain expert advice, manage risk, or meet
compliance and governance requirements.</li>
<li><span className="font-semibold">Sharing Data with Your Consent:</span> If your personal data is ever intended to be shared with a third party that is not acting on behalf of Notifly, we will notify you in advance. In such cases, you will have the opportunity
to withhold consent and prevent the sharing of your information, except where disclosure is legally required or related to an official investigation or judicial process.<br />
Notifly may be limited from providing prior notice when disclosure is mandated by law or
connected to an ongoing legal matter.</li>
</ol>
          </section>

          {/* Payments Processing */}
          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/60 to-[#b4f0e0]/60 p-6 shadow-md">
            <h2 className="text-xl font-semibold text-indigo-700 mb-2">
             Payments Processing
            </h2>
            <p className="mb-3 text-gray-800">
             We use Stripe, Inc. (<b>“Stripe”</b>) to process subscription payments. When you make a purchase
through our Services, your payment information (such as credit or debit card details, billing
address, and transaction data) is collected and processed directly by Stripe. Stripe acts as
an independent data controller with respect to payment processing and may process your
personal data in accordance with its own legal and regulatory obligations, such as fraud
prevention and compliance with financial regulations.
            </p>
            <p className="mb-3 text-gray-800">
             We do not have access to your full payment card details. We only receive limited
information from Stripe necessary to confirm your subscription and maintain your account
(e.g., payment confirmation, expiration date of your subscription).
            </p>
          </section>

          {/* Advertising Policy */}
          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/60 to-[#b4f0e0]/60 p-6 shadow-md">
            <h2 className="text-xl font-semibold text-purple-600 mb-2">
              Advertising Policy
            </h2>
            <p className="mb-3 text-gray-800">
              Notifly does not use personal data or user records for behavioral targeting or commercial advertising. We do not create user profiles for marketing purposes. All data collected is used strictly as defined in this Privacy Policy.</p>
            <p className="mb-3 text-gray-800">
             While school or district staff may include links to third-party websites within the Platform, Notifly has no control over such external websites and assumes no responsibility for their content, privacy practices, or data handling policies. Before interacting with external websites, users are encouraged to review those sites’ privacy policies and terms.</p>
          </section>

          {/* How Notifly Stores and Safeguards Your Information */}
          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#b4f0e0]/60 to-[#e0d9ff]/60 p-6 shadow-md">
            <h2 className="text-2xl font-bold text-emerald-600 mb-3">
              How Notifly Stores and Safeguards Your Information
            </h2>
            <p className="mb-3 text-gray-800">
             Notifly is committed to upholding strict privacy and data protection standards. We work closely with schools and districts to ensure compliance with FERPA and all applicable privacy regulations. Our staff, contractors, and service providers are held to the same standards and are contractually bound to handle data securely and responsibly</p>
             <p className="mb-3 text-gray-800">We use a variety of security technologies and procedures to help protect your personal data
from unauthorized access, use or disclosure. We secure the personal data you provide on
computer servers in a controlled, secure environment, protected from unauthorized access,
use or disclosure. All personal data is protected using appropriate physical, technical and
organizational measures.</p>
             <p className="mb-3 text-gray-800">To keep your information secure, we use industry-standard encryption methods both
during transmission and while data is stored on our servers. All account-related
information is housed on secure servers behind firewalls, and advanced security protocols
are in place to safeguard your data against unauthorized access.</p>
             <p className="mb-3 text-gray-800">We regularly update our infrastructure and employ best practices in cybersecurity to
ensure that personal information remains confidential, protected, and only accessible to
authorized users.</p>
             <p className="mb-3 text-gray-800">We also encourage all users to play an active role in protecting their accounts by using
strong passwords, logging out when not in use, and reporting any suspicious activity
immediately.</p>
<h6 className="font-semibold mb-2">Data Breach Response</h6>
<p className="mb-3 text-gray-800">In the event that Notifly becomes aware of a confirmed data breach involving personal data,
we will take immediate steps to investigate, contain, and mitigate the breach. Notifly will
notify the Customer in accordance with applicable data protection laws and the terms of
our Institution Agreement and Customer Data Processing Agreement.</p>
<p className="mb-3 text-gray-800">If required by law or at the request of the Customer, we will also notify affected users. Our
goal is to notify the Customer within 72 hours of confirming a breach - sooner if applicable
law or the contract mandates it.</p>
<p className="mb-3 text-gray-800">Should any action be required on the part of the Customer in response to the breach, Notifly
will provide guidance and support to help facilitate a coordinated and effective response.</p>

<h6 className="font-semibold mb-2">Retention of Personal Data</h6>
<p className="mb-3 text-gray-800">Notifly retains personal data only for as long as necessary to fulfill the purposes described
in this Privacy Policy or to meet applicable legal, regulatory, or contractual obligations. The
specific retention period depends on the type of data collected and the reason for its
processing.</p>
<p className="mb-3 text-gray-800">Personal data associated with your account is retained for the duration of your active
relationship with Notifly and for a limited period after your account has been deactivated.
Unless a longer retention period is legally required or necessary for legitimate business
purposes (such as resolving disputes or enforcing agreements), we will delete or
anonymize personal data within approximately 90 (ninety) days following account
deactivation.</p>
<p className="mb-3 text-gray-800">We may retain limited personal data when we have an ongoing legitimate business need to
do so — for example, to comply with legal obligations, maintain accurate business and
financial records, or meet reporting and audit requirements.</p>
<p className="mb-3 text-gray-800">When we no longer have a legitimate need to process your personal data, we will securely
delete or anonymize it. If immediate deletion is not possible, we will isolate and securely
store the information until deletion becomes feasible.</p>
<p className="mb-3 text-gray-800">You may also request the deletion of your personal data at any time, as described in the
“Your Choices and Control Over Information” section of this Privacy Policy. Upon receiving
such a request, Notifly will work with the relevant school or district (where applicable) to
ensure that the data is deleted in accordance with applicable laws and Institution
Agreements.</p>
<p className="mb-3 text-gray-800">The data we process on behalf of Customers in connection with the Services is stored and
secured according to the <b>Terms of Service</b> and <b>Customer Data Processing Agreement.</b></p>
          </section>

           {/* Your Choices and Control Over Information */}
          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/60 to-[#e0d9ff]/60 p-6 shadow-md">
            <h2 className="text-2xl font-bold text-purple-600 mb-3">
              Your Choices and Control Over Information
            </h2>
            <p className="mb-3 text-gray-800">
              Notifly provides users with tools and options to manage personal information and
communication preferences responsibly.</p>
            <ul className="list-disc list-inside space-y-3 mb-3 ml-2">
            <li><span className="font-semibold">Managing Your Account:</span> You can review, update, and correct your account information by logging into the Platform. In some cases, updates to your contact details must be made through your school or
district’s Student Information System (SIS). If direct edits are restricted, your district will
provide alternate instructions to ensure your information can be updated appropriately</li>
 <li><span className="font-semibold">Opting Out of Communications:</span> You may choose to opt out of receiving non-essential or promotional communications from Notifly at any time by following the unsubscribe instructions included in our messages or by adjusting your communication preferences within your account settings.<br />
Please note that opting out of such messages will not affect the delivery of essential communications from your school or district, including important administrative notices, emergency alerts, or notifications regarding school closures.</li>
<li><span className="font-semibold">Deleting Your Account:</span> You have the right to request deletion of your personal data. If you wish to delete your account or no longer agree with the Terms of Service or Privacy Policy, please contact your school or district directly to initiate account removal. You may also request account deletion by contacting Notifly’s support team.<br />
Upon receiving a verified deletion request, Notifly will deactivate or remove your account and erase personal data from active systems. After deletion, your account will be inaccessible, and your information will no longer be viewable by other users, including school staff, unless retention is required by law or permitted under contract with your educational institution.<br ></br>
Notifly may retain limited information as necessary to comply with legal obligations, resolve disputes, prevent misuse, support ongoing Services to Customers, or enforce Platform policies. If an account is deleted in error, it may be restorable within 30 (thirty)
days of removal upon verified request through your district.</li>
<li><span className="font-semibold">Administrative Access:</span> Authorized Customer administrators (e.g., school or district staff) may access user accounts
via approved tools such as single sign-on (SSO), Student Information System (SIS)
integrations, or other Notifly-provided features. These tools allow verified personnel to
manage accounts, resolve technical issues, or perform oversight and safety functions.<br />
When administrative access is enabled, the Customer (school or district) is responsible for
notifying users, obtaining any required consent, and ensuring that internal access complies
with applicable privacy laws and institutional Acceptable Use Policies (AUPs).
</li>
           </ul>
          </section>  

          {/*“Do-Not-Track” Signals */}
          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/60 to-[#e0d9ff]/60 p-6 shadow-md">
            <h2 className="text-xl font-semibold text-indigo-600 mb-2">
              “Do-Not-Track” Signals
            </h2>
            <p className="mb-3 text-gray-800">
             Most web browsers and some mobile devices offer a “Do Not Track” (“DNT”) setting that
allows you to express your preference not to have your online activities monitored or collected. Currently, no uniform standard exists for recognizing or responding to DNT signals.</p>
            <p className="mb-3 text-gray-800">Accordingly, Notifly does not respond to DNT browser requests or similar mechanisms at
this time. If an industry or legal standard for DNT is established in the future, we will
update this Privacy Policy to reflect our compliance with that standard.</p>
            <p className="mb-3 text-gray-800">In accordance with California law, we confirm that we do not respond to DNT signals
because no standardized process for doing so has been adopted.</p>
            <p className="mb-3 text-gray-800">
              A list of active third-party service providers used by Notifly,
              including the types of data shared and links to their privacy
              policies, will be made available upon request.
            </p>
          </section>

          {/* Updates to This Privacy Policy */}
          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#b4f0e0]/60 to-[#e0d9ff]/60 p-6 shadow-md">
            <h2 className="text-xl font-semibold text-indigo-600 mb-2">
              Updates to This Privacy Policy
            </h2>
            <p className="mb-3 text-gray-800">
              Notifly may update, revise, or modify this Privacy Policy from time to time to reflect
changes in our practices, technology, or legal obligations. If any material updates are made -
such as changes to how we collect or use personal information, or adjustments that may
affect the user data - we will notify by email or other appropriate channels. Typically, this
notice will be given at least seven (7) days before the updated Privacy Policy takes effect,
unless a shorter notice period is required or unavoidable.</p>
<p className="mb-3 text-gray-800">We encourage users to periodically review this Privacy Policy to stay informed about how
their information is handled. Your continued use of Notifly following the posting of any
updates means you accept those changes.</p>
          </section>

          {/* How to Contact Notifly */}
          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/60 to-[#e0d9ff]/60 p-6 shadow-md">
            <h2 className="text-xl font-semibold text-emerald-600 mb-2">
              How to Contact Notifly
            </h2>
            <p className="mb-3 text-gray-800">
             If you have questions about your account, this Privacy Policy, your data rights, or Notifly’s
privacy practices, you can contact us by email at <a className="text-[#0015ff]" target="_blank" href="privacy@mynotifly.com">privacy@mynotifly.com</a><br /><br />
We’re committed to ensuring your privacy and will respond to your inquiries in a timely
and transparent manner.ki</p>
          </section>

        </div>
      </div>
      <Footer />
    </>
  );
}

// Add this to your global CSS (e.g., index.css) for gradient animation:
// .animate-gradient-x {
//   background-size: 200% 200%;
//   animation: gradient-x 4s ease-in-out infinite;
// }
// @keyframes gradient-x {
//   0%, 100% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
// }
