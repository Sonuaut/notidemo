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
export default function Terms() {
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

        <div className="max-w-5xl mx-auto backdrop-blur-md rounded-3xl p-6 md:p-12 relative z-10">
          <h1 className="text-5xl font-extrabold mb-6 text-center bg-gradient-to-r from-indigo-600 via-purple-500 to-emerald-500 bg-clip-text text-transparent drop-shadow-lg animate-gradient-x">
            Terms of Use
          </h1>
          <p className="mb-8 text-center text-lg text-gray-700">
            <strong>Effective Date: November 13, 2025</strong>
          </p>

          {/* Section: Introduction */}
          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <p className="mb-3 text-gray-800">
              Welcome to our digital communication platform “Notifly” (hereinafter also referred to as
              the <b>“Platform”</b>) developed for K-12 schools and educational organizations to simplify and
              enhance communication between school staff and families.</p>
            <p className="mb-3 text-gray-800">
              These Terms of Service (hereinafter also referred to as the <b>“Terms”</b>) apply to your access
              and use of our Platform and any services, content, and features made available by us
              through the web-based platform accessible at https://mynotifly.com (<b>“Website”</b>), the
              mobile application “Notifly” (the <b>“App”</b>), or both (collectively referred to as the <b>“Services”</b>).</p>
            <p className="mb-3 text-gray-800">
              In these Terms, "Notifly,” the “Company,” “we,” “us,” and “our” refer to Notifly LLC and our
              successors, while “user,” “you,” and “your” refer to any user of our Services.</p>
            <p className="mb-3 text-gray-800">
              These Terms of Service constitute a binding legal contract between you and us, governing
              your access to and use of our Services. Please review these Terms carefully, as they include
              essential information concerning the Services offered, including but not limited to,
              provisions regarding future modifications, automatic renewals, limitations of liability,
              waiver of class actions, and the resolution of disputes through binding arbitration instead
              of court proceedings.</p>
              <p className="mb-3 text-gray-800">These Terms apply to all users of the Services, including individuals registered as teachers,
                counselors, educators, or other similar personnel (<b>“School Staff Members”</b>), as well as
                Institutional Representatives and Student Parents, each as defined below.</p>
                <p className="mb-3 text-gray-800">If you are accessing or using the Services as an employee, agent, or other authorized
                  representative (<b>“Institutional Representative”</b>) of a school, school district, or educational
                  institution (collectively, an <b>“Institution”</b>), you agree to these Terms on behalf of both
                  yourself and the Institution. By doing so, you represent and warrant that you have the
                  authority to bind the Institution to these Terms.</p>
                <p className="mb-3 text-gray-800">As an Institutional Representative, you are also subject to our Student Data Protection
                    Addendum (<b>“Student DPA”</b>), which governs the collection, processing, and protection of
                    student data. In addition, Institutions that enter into a direct contractual relationship with
                    Notifly will be required to execute the School District Terms of Service (the <b>“School
                    District Terms”</b>), which shall supplement and prevail over these Terms in the event of any
                    conflict.</p>
                <p className="mb-3 text-gray-800">
                    Your acceptance of these Terms becomes effective upon the earliest of: (i) your initial
                    access to or use of the Services; (ii) the creation of an account; or (iii) your express consent
                    to these Terms through any available method.</p>
                <p className="mb-3 text-gray-800">By proceeding, you acknowledge that you have read, understood, and agree to be bound by
                    these Terms. If you do not agree with any provision herein, you are not authorized to access
                    or use the Services and must discontinue all use immediately.</p>
          </section>

          {/* Section: Content */}
          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#b4f0e0]/80 via-[#e0d9ff]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-emerald-300">
            <h2 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-emerald-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
              Content
            </h2>
          <ul className="list-disc ml-4 space-y-1 text-gray-700">
            <li><a href="">Overview of the Platform</a></li>
            <li><a href="">Profile Creation and Management</a></li>
            <li><a href=""> User-Specific Terms</a></li>
            <li><a href="">Subscription Terms</a></li>
            <li><a href="">Use of Services</a></li>
            <li><a href="">Mobile App License</a></li>
            <li><a href="">Intellectual Property Rights</a></li>
            <li><a href="">User Content and Submissions</a></li>
            <li><a href="">Updates and Service Adjustments</a></li>
            <li><a href="">Privacy</a></li>
            <li><a href="">Termination and Account Deactivation</a></li>
            <li><a href="">Disclaimer of Warranties</a></li>
            <li><a href="">Limitations of Liability </a></li>
            <li><a href="">Indemnification</a></li>
            <li><a href="">Governing Law and Dispute Resolution</a></li>
            <li><a href="">Service Availability</a></li>
            <li><a href="">Electronic Communications and Signatures</a></li>
            <li><a href="">Changes to Terms</a></li>
            <li><a href="">General Terms</a></li>
            <li><a href="">Contact Us</a></li>
          </ul>
          </section>

          {/* Section: Overview of the Platform */}
          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
            <h2 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              Overview of the Platform
            </h2>
            <p className="mb-3 text-gray-800">
              Notifly is a digital communication tool that helps schools and districts to streamline
              classroom updates, behavior alerts, academic notifications, and wellness check-ins through
              real-time SMS and email communication through the Platform. 
              The Platform enables efficient outreach, faster responses, and simplified communication
              across school communities — supporting educators, administrators, and families in
              maintaining consistent and meaningful connections
            </p>
            <p className="mb-3 text-gray-800">The Platform supports three primary categories of users</p>
            <ul className="list-disc space-y-1 text-gray-700 ml-4">
              <li><b>Institutional Representatives</b> — authorized administrators of an Institution
                responsible for onboarding and managing School Staff Members through the
                Services.</li>
              <li><b>School Staff Members</b> — teachers, counselors, educators, or other personnel
                affiliated with an Institution who are authorized to access and process
                student-related information.</li>
              <li><b>Student Parents</b> — legal parents or guardians of students who receive updates,
                notifications, and communications related to their child’s academic progress.</li>
            </ul>
          </section>

          {/* Section: Profile Creation and Management */}
          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h2 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-700 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
             Profile Creation and Management
            </h2>
            <p className="mb-3 text-gray-800">
              Depending on your user category, you may be required to register an account to access
              certain features of the Services. This process may include creating a secure password and
              maintaining your login credentials.<br />
              You are solely responsible for:</p>
              <ul className="list-disc space-y-1 text-gray-700 ml-4">
                <li>Maintaining the confidentiality of your account and password;</li>
                <li>Restricting access to your account; and</li>
                <li>All activities that occur under your account credentials.</li>
              </ul>
              <p className="mt-3 text-gray-800">By creating or updating a profile through the Platform, you agree to maintain information
                that is accurate, complete, and up-to-date. You are responsible for reviewing your profile to
                ensure all details reflect your intended information accurately.<br/>
                If you identify any inaccuracies, it is your responsibility to correct them promptly or contact
                Notifly for assistance. By uploading or submitting any content or documents, you
                acknowledge that you are responsible for the accuracy and completeness of the materials
                provided</p>
          </section>

          {/* Section: User-Specific Term */}
          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#b4f0e0]/80 via-[#e0d9ff]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-emerald-300">
            <h2 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-emerald-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
             User-Specific Term
            </h2>
            <p className="mb-3 text-gray-800">
            These Terms apply to all users of the Notifly platform. However, your responsibilities and
            access may vary depending on your role within your school or district.<br />
            Please refer to the section applicable to your user category to understand the features
            available to you and the responsibilities associated with your use of the Services.
            </p>
           <h5 className="font-semibold mb-2 text-xl">a) Platform Functionality for Institutional Representatives</h5>
            <p className="mb-3 text-gray-800">For purposes of this Section, “Service Functionality for Institutional Representatives,” all
              references to “you” or “your” refer to the individual accessing the Platform in the capacity of
              an authorized representative of the Institution. As an Institutional Representative, you may
              use the Platform and its content solely for its intended educational purposes.<br />
              The Platform allows you to:</p>
              <ul className="list-disc space-y-1 text-gray-700 ml-4">
                <li>Create and manage an Institution’s account (<b>“School Account”</b>) on behalf of the Institution you represent.</li>
                <li>Upload CSV files containing parents’ and students’ information.</li>
                <li>Upload CSV files containing school teachers’ information.</li>
                <li>Approve School Staff Members’ sign-up requests.</li>
                <li>Deactivate School Staff Members’ accounts</li>
                <li>Create message templates.</li>
                <li>View user analytics for all School Staff Members associated with the School Account.</li>
                <li>Recharge the School Account’s credits.</li>
              </ul>
              <h6 className="font-semibold mt-3">School Account Creation</h6>
              <p className="mb-3 text-gray-800">The sign-up process requires an Institution to first create its organizational account
                through the Website form. Only after the organizational account is established may the
                Institution add individual School Staff Members. By creating a School Account, you
                represent and warrant that you possess all necessary rights and authority to bind the
                Institution to these Terms.</p>
              <h6 className="font-semibold mt-3">Responsibility for Information Accuracy</h6>
              <p className="mb-3 text-gray-800">You are solely responsible for verifying the legitimacy and ensuring the compliance of the
                School Staff Members you add to your School Account. This includes conducting any
                necessary due diligence to confirm that the School Staff Members meet all legal, ethical, and
                regulatory requirements applicable to their operations practices.<br />
                You must ensure that all information provided regarding the Institution and School Staff
                Members is accurate, complete, and up-to-date.<br />
                As an Institutional Representative, you are responsible for ensuring that contact
                information on onboarded School Staff Members is accurate and that they have consented
                to being invited to use Notifly. You must not invite individuals who are unaffiliated with
                your Institution or not intended recipients of school communications.<br />
                As an Institutional Representative, you are responsible for verifying the accuracy of any
                parent or guardian contact information uploaded to the Platform, ensuring that all message
                recipients are authorized, and confirming that any required parental or guardian consent
                has been properly obtained.<br />
                You are responsible for ensuring that all activities conducted through the Platform fully
                comply with all applicable educational-related laws, regulations, and data protection
                requirements.</p>
                <h6 className="font-semibold mb-2">School and District Policy Compliance</h6>
                <p className="mb-3 text-gray-800">As an Institutional Representative, you are required to comply with your Institution’s
                    Acceptable Use Policy, internal technology guidelines, and all applicable local, state, and
                    federal regulations when using Notifly.<br />
                    All communications sent through the Platform must be initiated only by authorized School
                    Staff Members or administrators acting within the scope of their official duties.<br />
                    The Platform may be used solely by Institutions that have formally approved its
                    implementation through their established technology review and acceptable use
                    procedures.<br />
                    Notifly will cooperate with Institutions to ensure that its features, data handling practices,
                    and technical integrations remain consistent with local approval, privacy, and compliance
                    requirements applicable to educational technology solutions.
                  </p>
                   <h5 className="font-semibold mb-2 text-xl">b) Platform Functionality for School Staff Members</h5>
                <p className="mb-3 text-gray-800">For the purposes of this Section, “Platform Functionality for School Staff Members,” all
                  references to “you” or “your” refer to the individual accessing the Platform in the capacity of
                  a teacher, counselor, educator, or any other authorized personnel with access to educational
                  records. As a School Staff Member, you may use the Platform and its content solely for its
                  intended educational purposes.<br />
                  As a School Staff Member, you may use the Platform to:</p>
                  <ul className="list-disc space-y-1 text-gray-700 ml-4 mb-3">
                    <li>Create and manage your profile and profile information.</li>
                    <li>Upload CSV files containing parent and student information.</li>
                    <li>Send email and SMS notifications to students’ parents.</li>
                    <li>View user analytics related to your own activity on the Platform.</li>
                    <li>Request credit replenishment to increase your email/SMS message capacity.</li>
                  </ul>
                  <h6 className="font-semibold mb-2">User Registration</h6>
                  <p className="mb-3 text-gray-800">When a School Staff Member downloads the App, they will be prompted to select their
                    Institution during the registration process. After an Institution is selected, the Institution
                    will receive a notification and must manually approve each new registration before the
                    account becomes active.<br />
                    As a School Staff Member, you may access only those school communications and features
                    that are specifically associated with your approved School Account.</p>
                    <h6 className="font-semibold mb-2">Account Verification</h6>
                  <p className="mb-3 text-gray-800">All School Staff Members must be verified by their Institution during the registration
                    process. However, Notifly does not conduct or validate this verification. The Institution is
                    solely responsible for identifying, approving, and verifying legitimate School Staff Members
                    who are granted access to the App.</p>
                    <h6 className="font-semibold mb-2">Responsibility for Information Accuracy</h6>
                  <p className="mb-3 text-gray-800">You are solely responsible for the accuracy, completeness, and timeliness of any
                    information or materials you upload to the Platform. You agree to promptly update your
                    profile and any other information you have provided to ensure it remains accurate and
                    reflects your current circumstances.</p>
                    <h5 className="font-semibold mb-2 text-xl">c) Platform Functionality for Student Parent</h5>
                <p className="mb-3 text-gray-800">For the purposes of this Section, “Platform Functionality for Student Parents,” all references
                  to “you” or “your” refer to the individual accessing and using the Platform in the capacity of
                  a parent or legal guardian of a student whose Institution uses the Platform to send
                  school-related notifications. As a Student Parent, you may access and use the Platform and
                  its content solely for personal, non-commercial purposes related to your child’s academic
                  activities.<br />
                  By using the Platform, you may:</p>
                   <ul className="list-disc space-y-1 text-gray-700 ml-4 mb-3">
                    <li>Receive email notifications by default when sent by your child’s teacher or
                      Institution regarding academic progress, school updates, or other educational
                      communications; and</li>
                    <li> Opt in to receive SMS notifications, enabling you to receive similar updates from the
                      Institution and its authorized School Staff Members via text message.</li>
                  </ul>
                  <p className="mb-3 text-gray-800">As a Student Parent, your access is limited to communications and content that are relevant
                    to your child’s school, teachers, and educational activities.</p>
                  <h6 className="font-semibold mb-2">SMS Texts and Email Communications</h6>
                  <h5 className="font-semibold mb-2 ml-3">a) At the Direction of the Institution</h5>
                  <p className="mb-3 text-gray-800 ml-3">Notifly, acting on behalf of and at the direction of an Institution, may send informational
                    messages to Student Parents. These communications may include, but are not limited to:</p>
                  <ul className="list-disc space-y-1 text-gray-700 ml-6 mb-3">
                    <li>Messages providing information related to their child’s academic progress;</li>
                    <li>Responses to inquiries regarding your account or use of Notifly; or</li>
                    <li>Updates or notifications relevant to the Institution’s educational activities.</li>
                  </ul>
                  <p className="mb-3 text-gray-800 ml-3">By providing your email address or other contact information to your child’s Institution,
                    you consent to receive such informational communications from Notifly acting as a service
                    provider for that Institution.</p>

                  <h5 className="font-semibold mb-2 ml-3">b) SMS Opt-In Text</h5>
                  <p className="mb-3 text-gray-800 ml-3">If, as a Student Parent, you have opted in to receive SMS text messages through the Services
                    and have directly provided your phone number to Notifly, you agree that we may send you
                    text messages related to your use of the Services and in accordance with these Terms.
                    You may opt out of SMS communications at any time. <b>To stop receiving text messages
                    from Notifly</b>, simply reply <b>“STOP”</b> to any message. You may continue to receive text
                    messages for a brief period while we process your request, including a final confirmation
                    that your opt-out has been received.</p>
                   <h5 className="font-semibold mb-2 text-xl">d)  Institution FERPA Compliance</h5>
                  <p className="mb-3 text-gray-800">Notifly recognizes the importance of institutional compliance with the Family Educational
                    Rights and Privacy Act (<b>“FERPA”</b>) and related federal regulations. Certain information
                    provided to Notifly by School Staff Members or Institutional Representatives that is directly
                    related to a student and maintained by an Institution may constitute an education record
                    under FERPA (<b>“Education Record”</b>). Additionally, some student information, such as a
                    student’s name, may be considered directory information (<b>“Directory Information”</b>) and
                    therefore not classified as an Education Record under FERPA.<br />
                    Institutions are generally prohibited from disclosing personally identifiable information
                    from a student’s Education Record to third parties without the prior written consent of the
                    parent or eligible student, unless an applicable FERPA exemption applies. Common
                    exemptions include the Directory Information Exemption and the School Official Exemption
                    (as defined under FERPA).<br />
                    For the purposes of FERPA, to the extent that personal information from Education Records
                    is transmitted to Notifly by an Institution using accounts provisioned or managed at the
                    direction of that Institution, Notifly shall be deemed a <b>“School Official”</b> with a legitimate
                    educational interest, performing services that the Institution would otherwise provide
                    itself.<br />
                    If an Institution discloses Education Records under FERPA, it must include in its Annual
                    Notification of FERPA Rights both:</p>
                    <ul className="list-disc space-y-1 text-gray-700 ml-4 mb-3">
                      <li>The criteria for determining who constitutes a “School Official”; and</li>
                      <li>What constitutes a “legitimate educational interest.”</li>
                    </ul>
                     <p className="mb-3 text-gray-800">The Institution further represents, warrants, and covenants to Notifly that it has</p>
                     <ul className="list-disc space-y-1 text-gray-700 ml-6 mb-3">
                      <li><b>Complied with the School Official Exemption</b>, including informing parents in its
                        Annual Notification of Rights that “School Officials” include service providers such
                        as Notifly and that “legitimate educational interests” include services of the type
                        provided by Notifly; and/or</li>
                      <li><b>Complied with the Directory Information Exemption</b>, including informing
                          parents and eligible students of what information the Institution designates as
                          Directory Information, providing a reasonable opportunity to opt out, and excluding
                          from disclosure any student for whom such an opt-out has been exercised; and/or</li>
                      <li><b>Obtained all necessary written consents</b> from parents or eligible students to
                        share student data with Notifly, solely for the purpose of enabling Notifly to operate
                        and deliver the Services.</li>
                     </ul>
                     <p className="mb-3 text-gray-800">Institutions are solely responsible for ensuring that proper parental notifications,       consents, and disclosures are in place before transmitting any student data to Notifly.<br />
                        Notifly relies on each Institution to ensure compliance with all applicable FERPA provisions
                        regarding the disclosure of Education Records and student data. Notifly does not provide
                        legal advice and cannot determine whether an Institution’s existing FERPA notices or
                        practices are sufficient. Institutions and their staff should consult their own legal counsel
                        regarding FERPA compliance obligations.<br />
                        In summary, FERPA grants parents specific rights over their children’s Education Records
                        and generally prohibits schools from sharing personally identifiable information without
                        consent or an applicable exemption. Therefore, before any School Staff Member provides
                        student information to Notifly, the Institution must ensure that an appropriate FERPA
                        exemption applies or that the necessary parental or student consent has been obtained.<br />
                        For more information about FERPA, Notifly’s commitments to support Institutional
                        compliance, and related obligations, please refer to our Student Data Protection
                        Addendum (Student DPA).</p>
          </section>

          {/* Section: Subscription Terms */}
          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
            <h2 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              Subscription Terms  
            </h2>
             <h5 className="font-semibold mb-2 text-xl">Enrollment and Access</h5>
            <p className="mb-3 text-gray-800">To access and use the Services, Institutions shall select one of the available paid access
              options (<b>“Plans”</b>).<br />
              Institutional Representatives are responsible for selecting the appropriate Plan based on
              the number of users or seats needed for their School Staff Members.</p>
              <h5 className="font-semibold mb-2 text-xl">Payment and Billing Terms</h5>
            <p className="mb-3 text-gray-800">By activating a Plan, you agree to pay all associated fees as listed at the time of purchase,
              including any applicable taxes, and to comply with the payment schedule then in effect.<br />
              You must be age eighteen (18) to make purchases through the Services. Users under that
              age must obtain consent from a parent or legal guardian before completing any transaction.< br />
              Only valid and authorized payment methods may be used. The subscriber bears full
              responsibility for any unauthorized or fraudulent use of their payment credentials.
              Additional charges may apply depending on the financial institution or payment provider.</p>
              <h5 className="font-semibold mb-2 text-xl">Payment Processing and Methods</h5>
            <p className="mb-3 text-gray-800">Payments for Plans are securely handled through an external payment platform, such as
                Stripe or another authorized processor. You may use any of the payment options supported
                by that processor.<br />
                To activate a paid Plan, you must provide valid payment details (credit/debit card or bank
                account) and authorize the recurring billing of the selected amount at the specified
                intervals.<br />
                All transactions and data exchanges between you and the payment processor are governed
                by the processor’s own terms and privacy practices. Notifly does not control or assume
                liability for their operations or any related disputes. Any changes or cancellations to billing
                details must be made through the processor’s platform.</p>
                <h5 className="font-semibold mb-2 text-xl">Order Confirmation and Delivery of Service</h5>
                <p className="mb-3 text-gray-800">Once your payment is successfully processed, a confirmation email will be sent, and full
                    access to the Services will be activated.<br />
                    In case of any billing concerns or disputes, you agree to first notify us and make a good-faith
                    effort to resolve the issue before initiating a chargeback or formal payment dispute.</p>
                <h5 className="font-semibold mb-2 text-xl">Adjustments to Pricing</h5>
                <p className="mb-3 text-gray-800">The Company may modify pricing or available Plans at its discretion. Any revised pricing
                will take effect after prior notice is given. Periodic variations in subscription fees may also
                result from promotions, discounts, or other offers</p>
                <h5 className="font-semibold mb-2 text-xl">Renewal Policy</h5>
                <p className="mb-3 text-gray-800">Your Plan will renew automatically at the end of each billing cycle (monthly or annually, as
                    applicable). Renewal charges will be applied using the same payment method, unless the
                    subscription is canceled before the renewal date.</p>
                <h5 className="font-semibold mb-2 text-xl">Cancellation and Termination</h5>
                <p className="mb-3 text-gray-800">To stop future renewals, you must cancel your Plan prior to the next billing period.
                    Cancellations take effect at the end of the current term, and no refunds or partial credits are
                    issued for unused time or mid-term cancellations.<br />
                    Plan management, including cancellation, can be completed by signing into your School
                    Account and following the provided instructions.<br />
                    Access to the Services continues until the paid term concludes. To permanently remove
                    your School Account and associated data, please contact us at <a href="mailto:support@mynotifly.com">support@mynotifly.com</a></p>
          </section>

          {/* Section: User-Specific Terms */}
          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h2 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-700 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
             Use of Services
            </h2>
            <p className="mb-3 text-gray-800">
             By accessing or engaging with the Platform, you acknowledge and accept that your
              participation is bound by these Terms, as well as by the expectations and responsibilities
              associated with your user role within the Platform.<br />
              Your access to the Platform constitutes a limited, revocable, personal, non-exclusive, and
              non-transferable permission to use the Services for educational, non-commercial purposes
              only. The Company may suspend, modify, or revoke this permission at its sole discretion,
              without prior notice.<br />
              You understand that you receive no ownership or proprietary rights to any aspect of the
              Platform or Services. All software, source code, updates, databases, algorithms, designs,
              documentation, and other intellectual property remain the exclusive property of the
              Company and its licensors. Certain components may include open-source software
              governed by their respective licenses.<br />
              The Platform and its Services are not intended for use or distribution in jurisdictions where
              such operation would breach local law or impose registration or compliance obligations on
              the Company</p>
               <h5 className="font-semibold mb-2 text-xl">Acceptable Use and Restrictions Policy</h5>
              <p className="mb-3 text-gray-800">
                Your behavior on the Platform must reflect professional and lawful standards consistent
                with its educational purpose. Any conduct outside these parameters may result in
                disciplinary or access-related action.  
                To maintain the security and integrity of the Platform, you must refrain from:
              </p>

              <h5 className="font-semibold mb-2">a. Malicious Interference</h5>
              <ul className="list-disc space-y-1 text-gray-700 ml-4 mb-3">
                <li>Uploading or disseminating malicious code, malware, or any file designed to disrupt or damage systems or data.</li>
                <li>Attempting to bypass or disable any authentication, encryption, or protective mechanisms.</li>
                <li>Overloading, disrupting, or impairing network operations or servers.</li>
              </ul>

              <h5 className="font-semibold mb-2">b. Unauthorized Manipulation or Access</h5>
              <ul className="list-disc space-y-1 text-gray-700 ml-4 mb-3">
                <li>Reverse-engineering, decompiling, or extracting any source code or architecture of the App.</li>
                <li>Altering, translating, or creating derivative works of the Platform without written authorization.</li>
                <li>Impersonating another person, falsifying credentials, or accessing accounts without authorization.</li>
              </ul>

              <h5 className="font-semibold mb-2">c. Automated or Improper Extraction</h5>
              <ul className="list-disc space-y-1 text-gray-700 ml-4 mb-3">
                <li>Using bots, scrapers, or automated tools to gather data or monitor system performance.</li>
                <li>Building external databases or repositories using Platform content.</li>
                <li>Deploying unauthorized scripts or automated processes that interact with the Platform.</li>
              </ul>

              <h5 className="font-semibold mb-2">d. Misuse of Intellectual Property or Content</h5>
              <ul className="list-disc space-y-1 text-gray-700 ml-4 mb-3">
                <li>Removing or altering proprietary notices such as trademarks or copyrights.</li>
                <li>Using materials from the Services for resale, monetization, or commercial activity without explicit permission.</li>
                <li>Making the App available to multiple concurrent users beyond your authorized license.</li>
                <li>Recording, duplicating, or sharing Platform content or outputs outside the permitted scope of use.</li>
                <li>Exploiting Platform materials to create or train competing technologies or services.</li>
              </ul>

              <h5 className="font-semibold mb-2">e. Abusive or Unlawful Activity</h5>
              <ul className="list-disc space-y-1 text-gray-700 ml-4 mb-3">
                <li>Harassing, intimidating, discriminating, or otherwise causing harm to users.</li>
                <li>Posting or transmitting content that is defamatory, obscene, discriminatory, or illegal.</li>
                <li>Using the Platform to promote third-party products, campaigns, or advertisements not approved by your Institution.</li>
                <li>Submitting false abuse claims or manipulating customer support processes.</li>
                <li>Engaging in spamming, junk mail, or impermissible advertising or promotional activities, including violations of anti-spam laws such as the CAN-SPAM Act of 2003.</li>
              </ul>

              <h5 className="font-semibold mb-2">f. Privacy and Data Protection Violations</h5>
              <ul className="list-disc space-y-1 text-gray-700 ml-4 mb-3">
                <li>Circumventing privacy or security features.</li>
                <li>Collecting or sharing personal data from others without proper authorization or consent.</li>
                <li>Sharing protected or confidential information, including images or messages, outside the permitted institutional or educational context.</li>
              </ul>

               <h5 className="font-semibold mb-2">Monitoring and Enforcement</h5>
               <p className="mb-3 text-gray-800">Notifly may, but is not obligated to, monitor messages, files, or other communications
                  transmitted through the Platform. We reserve the right, at our sole discretion, to remove
                  content, restrict functionality, or revoke access if a user’s activity violates these Terms,
                  institutional policies, or any applicable laws or regulations.<br />
                  Notifly further reserves the right to investigate any suspected misuse of the Platform. We
                  may suspend or terminate access to the Services if we reasonably believe that you have
                  violated any provision of these Terms or are subject to legal, regulatory, or institutional
                  restrictions that affect your use of the Platform, in addition to any other legal remedies
                  available to us. These measures are necessary to maintain the security, integrity, and
                  intended educational purpose of the Services</p>
          </section>

          {/* Section: Mobile App License */}
          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#b4f0e0]/80 via-[#e0d9ff]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-emerald-300">
            <h2 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-emerald-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
              Mobile App License
            </h2>
            <h5 className="font-semibold mb-2 text-xl">Access to Platform Features</h5>
            <p className="mb-3 text-gray-800">
              The range of features you can access through the Platform depends on your user category.
              School Staff Members are required to download the App from either the Apple App Store or
              Google Play Store (each referred to as an “App Store”). Student Parents and Institutional
              Representatives may instead use the Platform via web or email access without installing
              the App.
            </p>

            <p className="mb-3 text-gray-800">
              We grant you a limited, revocable, personal, non-exclusive, and non-transferable license to
              install and operate the App on your own compatible mobile device, strictly in line with
              these Terms. In other words, you are permitted to use our App, but only under the following
              conditions:
            </p>

            <h5 className="font-semibold mb-2 text-xl">License Conditions</h5>
            <ul className="list-disc space-y-1 text-gray-700 ml-4 mb-3">
              <li><strong>Limited:</strong> Your use is restricted to non-commercial, educational purposes as defined in these Terms.</li>
              <li><strong>Non-transferable:</strong> You may not sell, lend, sub-license, assign, or otherwise share your license.</li>
              <li><strong>Non-exclusive:</strong> Others may receive and use the same license.</li>
              <li><strong>Revocable:</strong> We may suspend or withdraw this license if you breach these Terms or misuse the App at any time.</li>
            </ul>

            <p className="mb-3 text-gray-800">
              This license does not transfer ownership of the App or any intellectual property rights.
              All rights, titles, and interests in the App remain with the Company and its licensors.
            </p>

            <h5 className="font-semibold mb-2 text-xl">Restrictions on Use</h5>
            <p className="mb-3 text-gray-800">You agree not to engage in any of the following activities:</p>
            <ul className="list-disc space-y-1 text-gray-700 ml-4 mb-3">
              <li>Attempting to copy, decompile, disassemble, reverse engineer, decrypt, or otherwise derive the App’s underlying source code or structure.</li>
              <li>Modifying, adapting, enhancing, translating, or creating derivative works based on the App.</li>
              <li>Removing, obscuring, or altering any copyright, trademark, or proprietary notices.</li>
              <li>Using the App for resale, rental, advertising, or other revenue-generating activities without prior written consent.</li>
              <li>Making the App accessible on a shared or networked system that allows multiple simultaneous users.</li>
              <li>Employing the App to train, develop, or improve any competing product or service.</li>
              <li>Sending automated queries, spam, or unsolicited commercial messages via the App.</li>
              <li>Using the App in a manner that violates applicable laws or regulations, or that infringes upon the intellectual property or privacy rights of others.</li>
              <li>Using proprietary materials, interfaces, or design elements to create or distribute other applications or tools intended for use with, or as substitutes for, our App.</li>
            </ul>

            <h5 className="font-semibold mb-2 text-xl">Terms Applicable to App Store Distribution</h5>

            <h5 className="font-semibold mb-2">a) Scope of License</h5>
            <p className="mb-3 text-gray-800">
              Your license is limited to personal use on a device that runs the relevant operating system
              (iOS or Android) and must conform to the usage rules established by the applicable App Store.
            </p>

            <h5 className="font-semibold mb-2">b) Support and Maintenance</h5>
            <p className="mb-3 text-gray-800">
              Notifly is solely responsible for providing maintenance or technical support required under
              these Terms or applicable law. The App Stores are not obligated to offer maintenance or support services.
            </p>

            <h5 className="font-semibold mb-2">c) Warranty Limitations</h5>
            <p className="mb-3 text-gray-800">
              If the App does not conform to an applicable warranty, you may notify the App Store,
              which may refund the purchase price (if applicable) according to its policies.
              To the fullest extent permitted by law, the App Store bears no further warranty responsibility.
            </p>

            <h5 className="font-semibold mb-2">d) Legal and Export Compliance</h5>
            <p className="mb-3 text-gray-800">
              You may not access or use the App if you are located in a country subject to U.S. embargoes
              or designated as a “terrorist-supporting” jurisdiction, or if you appear on any U.S. government
              restricted-party list. You agree to comply with all export control, sanctions, and consumer protection laws.
            </p>

            <h5 className="font-semibold mb-2">e) Claims and Liability</h5>
            <p className="mb-3 text-gray-800">
              The App Store is not responsible for addressing claims arising from your possession or use of the App,
              including product liability, failure to comply with legal obligations, or consumer protection claims.
              Such matters fall under the Company’s responsibility.
            </p>

            <h5 className="font-semibold mb-2">f) Intellectual Property Rights</h5>
            <p className="mb-3 text-gray-800">
              If a third party alleges that the App or your use of it infringes their intellectual property,
              Notifly will be solely responsible for investigating, defending, and resolving such claims.
              Neither Apple nor Google has any obligation concerning these claims.
            </p>

            <h5 className="font-semibold mb-2">g) Third-Party Agreements</h5>
            <p className="mb-3 text-gray-800">
              Your use of the App must comply with all relevant third-party terms —
              such as your mobile network provider or any VoIP services used with the App.
            </p>

            <h5 className="font-semibold mb-2">h) Third-Party Beneficiary Status</h5>
            <p className="mb-3 text-gray-800">
              You acknowledge that the Apple App Store and Google Play Store are intended third-party beneficiaries
              of this license and may enforce its provisions directly against you.
            </p>

            <h5 className="font-semibold mb-2 text-xl">Contact and Support</h5>
            <p className="mb-3 text-gray-800">
              For any questions, issues, or complaints regarding the App, including those concerning maintenance,
              functionality, or intellectual property matters, please contact us using the information provided
              in the “Contact Us” section below.
            </p>
          </section>

          {/* Section: Intellectual Property Rights */}
          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
            <h2 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              Intellectual Property Rights
            </h2>

            <p className="mb-3 text-gray-800">
              All intellectual property related to the Services — including, without limitation, source code,
              databases, design elements, software, interfaces, text, images, audio, video, and other
              materials (collectively, the <b>“Content”</b>) — together with all trademarks, service marks,
              logos, and trade dress appearing within the Services (collectively, the <b>“Marks”</b>) — are and
              shall remain the exclusive property of Notifly and its licensors.
            </p>

            <p className="mb-3 text-gray-800">
              The Content and Marks are protected under United States and international copyright,
              trademark, and unfair competition laws, as well as related treaties. No ownership rights are
              transferred to you by virtue of accessing or using the Services.
            </p>

            <p className="mb-3 text-gray-800">
              Subject to your ongoing compliance with these Terms, Notifly grants you a limited,
              revocable, non-exclusive, non-transferable, and non-sublicensable license to access and use
              the Content solely for personal, non-commercial, or internal institutional purposes as intended
              by the Services.
            </p>

            <h5 className="font-semibold mb-2 text-xl">Unauthorized Uses</h5>
            <p className="mb-3 text-gray-800">Unless expressly authorized in writing by Notifly, you may not:</p>

            <ul className="list-disc space-y-1 text-gray-700 ml-4 mb-3">
              <li>Copy, reproduce, aggregate, republish, or redistribute any Content or Marks;</li>
              <li>Upload, post, or publicly display any materials derived from the Services;</li>
              <li>Modify, translate, encode, or adapt the Content or Marks;</li>
              <li>Transmit, sell, license, or otherwise exploit the Content or Marks for commercial or promotional purposes;</li>
              <li>Remove or obscure any copyright, attribution, or proprietary notices.</li>
            </ul>

            <p className="mb-3 text-gray-800">
              If you wish to use the Content or Marks for any purpose not covered under this limited license,
              please submit a written request to <strong>support@mynotifly.com</strong>. If such permission is granted,
              you must clearly attribute ownership to Notifly or its licensors and ensure that all copyright and
              proprietary notices remain visible and intact.
            </p>

            <p className="mb-3 text-gray-800">
              Any unauthorized use of the Content or Marks, or any breach of this Section, will be treated
              as a material violation of these Terms and may result in the immediate suspension or termination
              of your right to access or use the Services, in addition to other remedies available under applicable law.
            </p>
          </section>

          {/* Section: User Content and Submissions */}
          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h2 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-700 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              User Content and Submissions
            </h2>
            <p className="mb-3 text-gray-800">
              Notifly does not claim ownership over any content, suggestions, feedback, or
              communications you submit or upload while using the Platform (<b>“Submissions”</b>). You
              retain full ownership of your Submissions. However, by using the Services, you grant Notifly
              a non-exclusive, worldwide, royalty-free, perpetual, irrevocable, and transferable (to a
              successor entity) license to use, reproduce, transmit, display, and share your Submissions
              within your Institution or affiliated organization for the purpose of operating and
              improving the Services</p>
            <p className="mb-3 text-gray-800">
             Because your Submissions may be visible to other users at your Institution, you also grant
              those users a non-exclusive, royalty-free, worldwide license to view, copy, store, and
              interact with your Submissions in accordance with the Platform’s functionality and their
              assigned role
            </p>
            <p className="mb-3 text-gray-800">
              Notifly is not required to post or retain any Submission you provide and reserves the right
              to remove, restrict, or delete content at any time if we believe it violates these Terms, school
              policies, or applicable laws or for any reason at our sole discretion.
            </p>
            <p className="mb-3 text-gray-800">
              By submitting any content through Notifly, you affirm that you have the rights, permissions,
              or legal authority necessary to share that material and that it does not infringe on the rights
              of others.
            </p>
            <p className="text-gray-800">
              All content submitted or shared through Notifly is the sole responsibility of the individual
              from whom it originated. Notifly does not guarantee the accuracy, integrity, or identity of
              other users, nor do we verify the authenticity of user-submitted information. You use and
              rely on shared content at your own risk and are solely responsible for any consequences
              that arise from doing so.
            </p>
          </section>

          {/* Section: Updates and Service Adjustments */}
          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#b4f0e0]/80 via-[#e0d9ff]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-emerald-300">
            <h2 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-emerald-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
              Updates and Service Adjustments
            </h2>
            <p className="mb-3 text-gray-800">Notifly’s Services may occasionally contain typographical errors, outdated information, or
            unintentional inaccuracies. We regularly update and improve the Platform to enhance
            functionality, correct issues, and refine user experience. By continuing to use Notifly, you
            acknowledge and accept that such modifications may occur and agree to receive any
            updates as part of the Service.</p>
          </section>

          {/* Section: Privacy */}
          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
            <h2 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              Privacy
            </h2>
            <p className="mb-3 text-gray-800">
              To understand how Notifly collects, uses, safeguards, and shares personal information,
              please review our Privacy Policy. By using the Services, you acknowledge and agree to the
              data practices outlined in that policy.
            </p>
          </section>

          {/* Section: Termination and Account Deactivation */}
          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h2 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-700 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              Termination and Account Deactivation
            </h2>
            <h5 className="font-semibold mb-2 text-xl">Termination by User</h5>
          <p className="mb-3 text-gray-800">
            You may end your relationship with Notifly at any time by stopping use of the Services and,
            if applicable, deleting your account. Please note that simply uninstalling the App or
            discontinuing use does not automatically cancel an active subscription.
          </p>
          <p className="mb-3 text-gray-800">
            If your Institution purchased a subscription through our Website, cancellation must be
            completed through your School Account settings or by notifying us in writing at
            <strong>unsubscribe@mynotifly.com</strong>. Until a valid cancellation request is processed, your
            subscription remains active and all fees remain payable.
          </p>

          <h5 className="font-semibold mb-2 text-xl">Account Deactivation</h5>
          <p className="mb-3 text-gray-800">
            If you are a School Staff Member and wish to deactivate your Notifly account, you may
            contact your Institution’s administrator or send a written request to Notifly. Since your user
            profile and access credentials may be institution-managed, Notifly may coordinate directly
            with your Institution to complete the deactivation or removal process.
          </p>

          <h5 className="font-semibold mb-2 text-xl">Termination by Notifly</h5>
          <p className="mb-3 text-gray-800">
            Notifly reserves the right, at its sole discretion, to suspend or permanently terminate user
            access to the Platform where it determines that:
          </p>

          <ul className="list-disc space-y-1 text-gray-700 ml-4 mb-3">
            <li>a user has violated these Terms;</li>
            <li>the Services have been misused or accessed in an unauthorized manner;</li>
            <li>such action is necessary to protect the integrity, security, or proper operation of the Platform.</li>
          </ul>

          <p className="mb-3 text-gray-800">
            Decisions regarding termination are made in good faith and at our discretion to ensure safe
            and compliant use of the Services.
          </p>

          <h5 className="font-semibold mb-2 text-xl">Effect of Termination on Subscriptions</h5>
          <p className="mb-3 text-gray-800">
            If you hold an active paid subscription at the time your account is terminated:
          </p>

          <ul className="list-disc space-y-1 text-gray-700 ml-4 mb-3">
            <li>
              <strong>Termination Without Cause:</strong> If we choose to terminate your account for reasons
              unrelated to misconduct or breach, we will issue a pro-rated refund of any prepaid
              subscription fees for the unused portion of the current term. This refund obligation
              does not apply if termination occurs due to insolvency, bankruptcy, or events outside
              our reasonable control.
            </li>
            <li>
              <strong>Termination for Cause:</strong> If your access is terminated due to a breach of these Terms or
              other prohibited activity, you are not entitled to any refund. Subscription charges
              will continue through the end of the current billing cycle.
            </li>
          </ul>

          <p className="mb-3 text-gray-800">
            Nothing in this section limits our right to pursue other remedies available under applicable
            law.
          </p>

          <h5 className="font-semibold mb-2 text-xl">Modification or Discontinuation of Services</h5>
          <p className="mb-3 text-gray-800">
            We may, at any time and without prior notice, modify, suspend, or discontinue any aspect of
            the Services, in whole or in part. We are not liable for any loss or inconvenience arising
            from such modification or discontinuation, provided that any prepaid, unused fees are
            handled in accordance with the provisions above.
          </p>
          </section>

          {/* Section: Disclaimer of Warranties */}
          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#b4f0e0]/80 via-[#e0d9ff]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-emerald-300">
            <h2 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-emerald-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
              Disclaimer of Warranties
            </h2>
            <p className="mb-3 text-gray-800">
              The platform, including all features, components, content, and marks, is
              provided “as is” and “as available.” to the maximum extent permitted by law,
              Notifly disclaims all warranties of any kind, whether express, implied, or
              statutory, including but not limited to implied warranties of
              merchantability, fitness for a particular purpose, quiet enjoyment,
              non-infringement, accuracy, and availability.
            </p>
            <p className="mb-3 text-gray-800">
              Notifly provides a digital communication platform solely for
              educational-related purposes between school institutions and parents.
              Notifly itself is not an educational institution and does not provide
              educational or learning services. You may use the platform only to the
              extent permitted by your institution and strictly in accordance with the
              intended purpose of the services.
            </p>
            <p className="mb-3 text-gray-800">
              No oral or written advice, guidance, or information obtained from Notifly,
              whether through the platform or otherwise, shall create any warranty
              not expressly stated in these terms. We do not guarantee that the
              platform or any services will operate without interruption, be secure,
              error-free, or continuously available. Access to the platform may be
              suspended, restricted, or terminated at any time without notice or
              liability.
            </p>
            <p className="mb-3 text-gray-800">
              While we may provide users with safety information, guidelines, or
              educational materials, such resources are offered solely for
              informational purposes. Notifly makes no representation or warranty as
              to the accuracy, completeness, reliability, or timeliness of any such
              materials, which may change or be updated periodically. All content is
              provided without warranty of any kind, and reliance upon it is entirely at
              the user’s discretion and risk.
            </p>
            <p className="mb-3 text-gray-800">We do not warrant or guarantee the accuracy, legality, completeness, or
              reliability of any information submitted by users through the platform.
              Any dependence on such information is at your own risk. Notifly expressly
              disclaims any and all liability for losses, damages, or claims arising out of
              or relating to user-submitted content or reliance on such information.</p>
          </section>

          {/* Section: Limitation of Liability */}
          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
            <h2 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              Limitation of Liability
            </h2>
           <p className="mb-3 text-gray-800">
              To the fullest extent permitted by applicable law, in no event shall Notifly, or any of its
              directors, officers, employees, agents, contractors, licensors, or any party involved in the
              creation, operation, or delivery of the Services, be liable for any special, indirect,
              incidental, punitive, exemplary, or consequential damages. This includes, without
              limitation, damages for loss of profits, loss of data, interruption of business, loss of
              goodwill, or the cost of substitute goods or services, arising out of or relating to:
            </p>

            <ul className="list-disc space-y-1 text-gray-700 ml-4 mb-3">
              <li>Your access to or use of, or inability to access or use, the Services or any content provided through them;</li>
              <li>The conduct or content of any third party using or relating to the Services;</li>
              <li>Any other legal theory, whether in contract, tort (including negligence), warranty, or otherwise, even if we have been advised of the possibility of such damages.</li>
            </ul>

            <p className="mb-3 text-gray-800">
              Notwithstanding anything to the contrary contained herein, the total liability of Notifly to
              you for any claim, demand, or cause of action, regardless of form, shall not exceed the
              greater of: (a) the total amount you paid for access to the Services during the six (6)
              month period immediately preceding the event giving rise to such claim, or (b) one
              hundred U.S. dollars ($100). This limitation applies even if any remedy fails of its
              essential purpose.
            </p>

            <h5 className="font-semibold mb-2 text-xl">Force Majeure</h5>
            <p className="mb-3 text-gray-800">
              Without limiting the foregoing, Notifly shall not be liable or responsible — nor deemed to
              have breached these Terms — for any delay, failure, or inability to perform caused directly
              or indirectly by events beyond its reasonable control. Such events include, but are not
              limited to:
            </p>

            <ul className="list-disc space-y-1 text-gray-700 ml-4 mb-3">
              <li>Acts of God or natural disasters, including floods, fires, storms, earthquakes, epidemics, or pandemics;</li>
              <li>Wars, hostilities (whether declared or not), invasions, terrorist acts, riots, civil unrest, or sabotage;</li>
              <li>Government orders, regulations, embargoes, sanctions, or other acts of authority;</li>
              <li>National or regional emergencies;</li>
              <li>Strikes, labor disputes, shortages, or industrial disruptions;</li>
              <li>Interruptions or failures in utilities, telecommunications, networks, or computer systems (including software, hardware, or viruses);</li>
              <li>Non-performance of third parties or service providers;</li>
              <li>Any other cause or circumstance beyond the Company’s reasonable control.</li>
            </ul>

            <h5 className="font-semibold mb-2 text-xl">State Law Exceptions</h5>
            <p className="mb-3 text-gray-800">
              Certain state laws in the United States do not allow the exclusion or limitation of implied
              warranties, or the limitation or exclusion of liability for incidental or consequential
              damages. If such laws apply to you, some or all of the foregoing disclaimers or
              limitations may not apply, and you may have additional rights under the law.
            </p>
          </section>

          {/* Section: Indemnification */}
          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h2 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-700 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              Indemnification
            </h2>
            <p className="mb-3 text-gray-800">
            You agree to defend, indemnify, and hold Notifly — including all of its directors, officers,
            employees, agents, contractors, licensors, and any party involved in the creation, operation,
            or delivery of the Services — harmless from and against any loss, damage, liability, claim,
            demand, penalty, fine, cost, or expense (including reasonable attorneys’ fees and expenses)
            asserted by any third party arising out of or related to:
          </p>

          <ul className="list-disc space-y-1 text-gray-700 ml-4 mb-3">
            <li>Your violation of any provision of these Terms;</li>
            <li>Your use or misuse of the Platform or any part of the Services;</li>
            <li>Any breach of your representations or warranties set forth in these Terms or any other applicable policies of Notifly;</li>
            <li>Your violation of any applicable law, regulation, or rule, including those relating to privacy or data protection.</li>
          </ul>

          <p className="mb-3 text-gray-800">
            We agree to promptly notify you of any claim subject to indemnification. However, our
            failure to do so shall not relieve you of your obligations under this section, except to the
            extent that such failure materially prejudices your ability to defend the claim.
          </p>

          <p className="mb-3 text-gray-800">
            At our option, you shall have the right to defend any such claim with counsel of your own
            choosing (subject to a conflicts review) and to settle such claim as you deem appropriate,
            provided that you shall not enter into any settlement without our prior written consent.
          </p>

          <p className="mb-3 text-gray-800">
            Notwithstanding the foregoing, Notifly reserves the right, at any time and at your expense,
            to assume the exclusive defense and control of any matter for which you are required to
            indemnify us, and you agree to cooperate, at your own expense, with our defense and
            resolution of such claims.
          </p>
          </section>

          {/* Section: Governing Law and Dispute Resolution */}
          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#b4f0e0]/80 via-[#e0d9ff]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-emerald-300">
            <h2 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-emerald-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
              Governing Law and Dispute Resolution
            </h2>
            <p className="mb-3 text-gray-800">
              This section contains an arbitration agreement and an acknowledgment that all claims must be
              brought in an individual capacity (not as a class or representative proceeding). It limits the
              manner in which you may seek relief from Notifly. You may opt out of the arbitration agreement
              by following the procedure described below.
            </p>

            <h5 className="font-semibold mb-2 text-xl">Choice Of Jurisdiction</h5>
            <p className="mb-3 text-gray-800">
              If the laws governing an Institution require otherwise, the laws of the state in which the
              Institution is located shall govern all matters arising out of or relating to these Terms,
              without regard to conflict of law principles. In such cases, the federal and state courts
              located in that jurisdiction shall have exclusive authority over any disputes arising in
              connection with these Terms.
            </p>
            <p className="mb-3 text-gray-800">
              In the absence of such governing laws, these Terms shall be governed by the laws of the State of
              Maryland, without regard to conflict of law rules. The federal and state courts located in
              Prince George’s County, District of Maryland, shall have non-exclusive jurisdiction over all
              disputes relating to these Terms.
            </p>

            <h5 className="font-semibold mb-2 text-xl">Amicable Negotiations</h5>
            <p className="mb-3 text-gray-800">
              The parties agree to first attempt to resolve any dispute, controversy, or claim arising out of
              or relating to these Terms or the Services (“Dispute”) through good faith informal negotiations
              lasting at least thirty (30) days before initiating arbitration.
            </p>
            <p className="mb-3 text-gray-800">
              Informal negotiations begin upon written notice from one party to the other. Completion of this
              process is required before arbitration or litigation may begin. Any action filed prematurely may
              be dismissed at the initiating party’s cost.
            </p>

            <h5 className="font-semibold mb-2 text-xl">Binding Arbitration Agreement</h5>
            <p className="mb-3 text-gray-800">
              If informal negotiations fail, the Dispute shall be resolved exclusively through binding
              arbitration administered by the American Arbitration Association (“AAA”) under its Consumer
              Arbitration Rules, or its Commercial Arbitration Rules if the Services are used on behalf of an
              Institution. The Federal Arbitration Act (“FAA”) governs this arbitration agreement.
            </p>

            <h5 className="font-semibold mb-2 text-xl">Associated Fees And Costs</h5>
            <p className="mb-3 text-gray-800">
              Filing, administrative, and arbitrator fees shall follow the applicable AAA Rules. Individuals
              using the Services personally are responsible for the initial filing fee, while Notifly will pay
              all other administrative and arbitrator fees for claims under USD $10,000, unless the arbitrator
              finds the claim frivolous. Each party bears its own legal fees unless required otherwise by law.
            </p>

            <h5 className="font-semibold mb-2 text-xl">Arbitration Procedures</h5>
            <p className="mb-3 text-gray-800">
              Arbitration may occur in person, virtually, or through written submissions. Virtual hearings are
              the default unless the arbitrator determines an in-person hearing is necessary. The arbitrator
              shall apply substantive law consistent with the FAA, issue a written decision, and the award
              shall be final and binding. Judgment may be entered in any competent court.
            </p>

            <h5 className="font-semibold mb-2 text-xl">Exceptions To Arbitration</h5>
            <p className="mb-3 text-gray-800">The obligation to arbitrate does not apply to:</p>
            <ul className="list-disc space-y-1 text-gray-700 ml-4 mb-3">
              <li>Disputes involving intellectual property rights;</li>
              <li>Requests for preliminary or injunctive relief;</li>
              <li>Disputes involving theft, piracy, invasion of privacy, or unauthorized use of personal data;</li>
              <li>Actions seeking enforcement or recognition of an arbitration award.</li>
            </ul>

            <h5 className="font-semibold mb-2 text-xl">Small Claims Court</h5>
            <p className="mb-3 text-gray-800">
              Either party may bring an individual claim in a small claims court of competent jurisdiction,
              including courts in Prince George’s County, Maryland, or an equivalent court in your state of
              residence. These Terms do not limit your rights under consumer protection laws.
            </p>

            <h5 className="font-semibold mb-2 text-xl">Opt-Out Right</h5>
            <p className="mb-3 text-gray-800">
              You may opt out of arbitration by sending written notice to support@mynotifly.com within thirty
              (30) days of the earlier of (i) your acceptance of these Terms or (ii) your first use of the
              Services under terms containing an arbitration provision. Your notice must include your name,
              mailing address, account email, and a clear request to opt out.
            </p>
            <p className="mb-3 text-gray-800">
              If you opt out or if arbitration is unenforceable, all Disputes will be resolved exclusively in
              state or federal courts located in Prince George’s County, Maryland, and you consent to their
              jurisdiction. You also waive the right to a jury trial.
            </p>

            <h5 className="font-semibold mb-2 text-xl">Limitation On Claims</h5>
            <p className="mb-3 text-gray-800">
              To the maximum extent permitted by law, any claim arising out of or relating to these Terms or
              the Services must be filed within one (1) year after the claim accrues. Claims filed after this
              period are permanently barred.
            </p>

            <h5 className="font-semibold mb-2 text-xl">Restrictions On Proceedings</h5>
            <p className="mb-3 text-gray-800">To the fullest extent permitted by law:</p>
            <ul className="list-disc space-y-1 text-gray-700 ml-4 mb-3">
              <li>No arbitration may be joined or consolidated with another;</li>
              <li>No Dispute may proceed on a class, collective, or representative basis;</li>
              <li>No party may act in a representative capacity for the public or others.</li>
            </ul>

            <h5 className="font-semibold mb-2 text-xl">Class Action Waiver; Waiver Of Jury Trial</h5>
            <p className="mb-3 text-gray-800">
              You agree that all Disputes must be brought solely in your individual capacity, not as a class
              representative or class member. You further agree not to participate in any class action against
              Notifly. If any Dispute proceeds in court, both parties waive any right to a jury trial, and the
              matter shall be decided by a judge.
            </p>

            <h5 className="font-semibold mb-2 text-xl">Severability</h5>
            <p className="mb-3 text-gray-800">
              If any provision of this section is found invalid or unenforceable, it shall be severed and the
              remaining provisions shall remain in effect. However, if the class action waiver is found
              unenforceable in arbitration, then the arbitration provisions shall not apply, and the Dispute
              shall instead be resolved in the state or federal courts located in Prince George’s County,
              Maryland.
            </p>
          </section>

          {/* Section: Electronic Communications and Signatures */}

            <div className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h2 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-emerald-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x">Electronic Communications and Signatures
            </h2>
           <p className="mb-3 text-gray-800">ou acknowledge and agree that accessing or using the Services, sending us emails, or
              completing online forms, constitute forms of electronic communication. You consent to
              receive communications from us electronically, and you agree that all agreements, notices,
              disclosures, and other communications we provide to you electronically, whether by email
              or through the Services, satisfy any legal requirement that such communications be in
              writing.</p>
              <p className="mb-3 text-gray-800">YOU HEREBY CONSENT TO THE USE OF ELECTRONIC SIGNATURES, ELECTRONIC
              CONTRACTS, ELECTRONIC ORDERS, AND ELECTRONIC RECORDS, AND TO THE
              ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS
              INITIATED OR COMPLETED BY US OR THROUGH THE SERVICES.</p>
              <p className="mb-3 text-gray-800">You waive any rights or requirements under any applicable laws that require an original
              (non-electronic) signature, physical delivery, or retention of paper records, or that mandate
              payment or the granting of credit by means other than electronic means.</p>
          </div>

           <div className="mb-10 rounded-2xl bg-gradient-to-r from-[#b4f0e0]/80 via-[#e0d9ff]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-emerald-300">
            <h2 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-emerald-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
            Credits and Add-on Purchases
            </h2>
            <ul className="list-disc   space-y-1 mb-3 ml-4 text-gray-700">
            <li>SMS/email credits and other add-on purchases are <b>non-refundable</b> and <b>non-transferable</b>, but will remain in your account even after cancellation</li>
            <li>If you choose to re-subscribe later, your unused credits will still be available.</li>
            </ul>
          </div>

           <div className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h2 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-emerald-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
           Changes to Terms
            </h2>
            <p className="mb-3 text-gray-800">Notifly may revise or update these Terms from time to time as new features are introduced
              or as required by law. We reserve the right to modify the Terms or any aspect of the
              Services at our discretion. When changes are made, we will post an updated version on our
              Website and may notify your Institution by email. In certain cases, such as changes required
              for legal compliance or to correct errors, advance notice may not be possible. Continued use
              of Notifly after any changes are posted constitutes acceptance of the updated Terms.</p>
          </div>

          <div className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h2 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-emerald-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x">General Term</h2>
             <p className="mb-3 text-gray-800">
                These Terms, together with the Privacy Policy, Student Data Protection Addendum (Student DPA),
                School District Terms, and any additional policies or operating rules published by us on the
                Platform or in connection with the Services, constitute the entire agreement and understanding
                between you and Notifly with respect to your use of the Services. They supersede all prior or
                contemporaneous communications, agreements, or understandings, whether written or oral.
              </p>

              <h5 className="font-semibold mb-2 text-xl">Relationship Of The Parties</h5>
              <p className="mb-3 text-gray-800">
                Nothing in these Terms shall be construed to create any joint venture, partnership, employment,
                or agency relationship between you and Notifly. You acknowledge that you do not have any
                authority, express or implied, to bind or otherwise obligate the Company in any manner
                whatsoever.
              </p>

              <h5 className="font-semibold mb-2 text-xl">Severability</h5>
              <p className="mb-3 text-gray-800">
                If any provision of these Terms is determined to be invalid, illegal, or unenforceable, that
                provision shall be modified or limited to the minimum extent necessary to make it enforceable,
                and the remaining provisions shall continue in full force and effect.
              </p>

              <h5 className="font-semibold mb-2 text-xl">Waiver</h5>
              <p className="mb-3 text-gray-800">
                Our failure or delay in enforcing any provision of these Terms shall not constitute a waiver of
                that provision or of any other rights or remedies we may have under these Terms.
              </p>

              <h5 className="font-semibold mb-2 text-xl">Assignment</h5>
              <p className="mb-3 text-gray-800">
                You may not assign, transfer, or sublicense these Terms or any of your rights or obligations
                under them without the prior written consent of Notifly. We may assign or transfer our rights
                and obligations under these Terms to any affiliate or successor entity that agrees to comply
                with these Terms.
              </p>
            </div>

             <div className="rounded-2xl bg-gradient-to-r from-[#b4f0e0]/80 via-[#e0d9ff]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-emerald-300">
            <h2 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-emerald-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x">Contact Us</h2>
             <p className="mb-4 text-gray-800">If you have any questions about these Terms or our Services, please contact Notifly at <a
                href="mailto:support@notiflyapp.com"
                className="text-indigo-600 underline"
              >
                support@notiflyapp.com
              </a></p>
               <h5 className="font-semibold mb-2 text-xl">Notifly LLC</h5>
                <p className="mb-2 text-gray-800">Our mailing address:</p>
                <p className=" text-gray-800 font-semibold">Notifly LLC</p>
                <p className=" text-gray-800 font-semibold">4500 Forbes Blvd</p>
                <p className="text-gray-800 font-semibold">Ste 200 - 1256</p>
                <p className="text-gray-800 font-semibold">Lanham, MD, 20706</p>

            </div>

        </div>
      </div>
      <Footer />
    </>
  );
}
