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

export default function Faqs() {
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
           Teachers
          </h1>
          <p className="mb-8 text-center text-lg text-gray-700">
            <strong>Getting Started</strong> 
          </p>

            <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-700 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              1. What is Notifly?
            </h3>
            <p className="mb-3 text-gray-800">Notifly is a fast communication tool for teachers and school staff to send real-time messages to parents and colleagues. It helps streamline classroom management, student support, and parent engagement.</p>
          </section>

           <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#b4f0e0]/80 via-[#e0d9ff]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-emerald-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-emerald-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
              How to create your Notifly account
            </h3>
           <ul className="list-style">
              <li>Go to <b><a href="https://www.mynotifly.com" target="_blank">www.mynotifly.com</a></b> or open the Notifly mobile app.</li>
              <li>Click “<b>Sign Up</b>”.</li>
              <li>Use your <b>school email address</b> to register.</li>
              <li>Set a secure password.</li>
              <li>Confirm your email address using the verification link.</li>
              <li>Log in and begin setting up your profile.</li>
            </ul>
          </section>

           <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
            How to upload your student/parent contact list
            </h3>
           <ul className="list-style">
            <li>Download our Notifly Upload Template.</li>
            <li>Fill in student and parent names using this article.</li>
            <li>Ensure phone numbers are 10 digits, no special characters.</li>
            <li>Save as a CSV.</li>
            <li>Go to the app to upload your CSV in the app.</li>
            <li>Click Upload, then select your file.</li>
          </ul>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              How to upload your student/parent contact list
            </h3>
            <ul className="list-style">
              <li>Download our Notifly Upload Template.</li>
              <li>Fill in student and parent names using this article.</li>
              <li>Ensure phone numbers are 10 digits, no special characters.</li>
              <li>Save as a CSV.</li>
              <li>Go to the app to upload your CSV in the app.</li>
              <li>Click Upload, then select your file.</li>
            </ul>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#b4f0e0]/80 via-[#e0d9ff]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-emerald-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              How to send your first message
            </h3>
            <ol className="list-decimal list-inside">
              <li>Open the Notifly app and login.</li>
              <li>Go to the Parent Messages tab.</li>
              <li>Click Start a new Message.</li>
              <li>Choose your student(s). Notifly supports multiple selections.</li>
              <li>Choose your premade message template (e.g., “Great Effort”).</li>
              <li>Choose whether to send via SMS, email, or both.</li>
              <li>Click Send and confirm.</li>
            </ol>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              How to update or remove a contact
            </h3>
            <ol className="list-decimal list-inside">
              <li>From your device, go to files. Open the CSV file you uploaded to Notifly.</li>
              <li>Search for the contact. Update or delete the information you would like changed.</li>
              <li>Click Save.</li>
              <li>In the Notifly app, upload the CSV again. Your contact now will be updated.</li>
            </ol>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              Types of messages you can send
            </h3>
            <ul className="list-disc list-inside">
              <li>Attendance & punctuality (e.g., "Tardy today")</li>
              <li>Behavior alerts (e.g., “Great participation”)</li>
              <li>Class reminders</li>
              <li>Academic updates (“Frequent unsatisfactory test scores”)</li>
              <li>Announcements to other staff members (e.g., "Head down in class")</li>
            </ul>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              How SMS & email notifications are delivered
            </h3>
            <ul className="list-disc list-inside">
              <li>Parents receive messages by SMS, email, or app both, depending on their registration.</li>
              <li>Email is default for unregistered parents.</li>
              <li>SMS & email are used for registered users.</li>
            </ul>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              Can school staff (e.g., counselor, dean) use Notifly?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">Yes. Notifly supports staff user roles beyond teachers. They can send messages to their uploaded student lists and to staff members.</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#b4f0e0]/80 via-[#e0d9ff]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-emerald-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              Can I message all parents at once?
            </h3>
            <ul className="list-disc list-inside">
              <li>Currently the app supports sending bulk messages to several recipients at a time.</li>
            </ul>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              How many messages can I send to a parent in one day?
            </h3>
            <ul className="list-disc list-inside">
              <li>Currently the app supports sending 3 messages per day per parent. This limit keeps communication manageable for parents that receive messages throughout the day from multiple teachers.</li>
            </ul>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              Will parents know it’s coming from me?
            </h3>
            <ul className="list-disc list-inside">
              <li>Yes. Each message includes your name (e.g., “Mr. Thomas”).</li>
              <li>SMS messages are sent from a dedicated Notifly number, usually preceded by the word “Notifly:”. Try text messaging yourself to obtain the dedicated number for your own records.</li>
              <li>Ask parents to set the name of the dedicated Notifly number to “Notifly” for future communication identification purposes.</li>
            </ul>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#b4f0e0]/80 via-[#e0d9ff]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-emerald-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              What languages does Notifly support?
            </h3>
            <ul className="list-disc list-inside">
              <li>English (Spanish, French, &amp; more coming soon)</li>
            </ul>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">Can parents reply to me directly?</h3>
            <p className="text-lg text-gray-700 leading-relaxed">No— two-way messaging is not an intended feature of Notifly. The goal is to update, not to
              converse. To put it simply, use Notifly to send the update quickly. Use other platforms to discuss.</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#b4f0e0]/80 via-[#e0d9ff]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-emerald-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">How can I tell if a parent saw my message?</h3>
            <p className="text-lg text-gray-700 leading-relaxed">Notifly shows delivery status for each message (Delivered, Failed, Pending) on the message
              history tab. However, due to SMS and email privacy standards, we can't track if a parent reads a
              message unless they reply.</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">Can I attach files or photos to messages?</h3>
            <p className="text-lg text-gray-700 leading-relaxed">No. Attachments cannot be included with either SMS or email messages.</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">What happens if a parent changes their number?</h3>
            <p className="text-lg text-gray-700 leading-relaxed">If a parent replies STOP or their number becomes invalid, you’ll see a delivery error. You can
              update their contact info in the Contacts tab.</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#b4f0e0]/80 via-[#e0d9ff]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-emerald-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">Can I use Notifly from my phone?</h3>
            <p className="text-lg text-gray-700 leading-relaxed">Yes! Download the Notifly App on the app store. It's optimized for sending quick updates.</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">Can I message students too?</h3>
            <p className="text-lg text-gray-700 leading-relaxed">No. Currently, Notifly is intended for teacher-to-parent communication.</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">Can I message students too?</h3>
            <p className="text-lg text-gray-700 leading-relaxed">No. Currently, Notifly is intended for teacher-to-parent communication.</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
          <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">Can I export message history or contact logs?</h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            Yes. Navigate to the Message Log section and use the Download button to download CSVs of
            sent messages or contact activity. Check your files folder on your device for your history file.
          </p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#b4f0e0]/80 via-[#e0d9ff]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-emerald-300">
          <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">What if I accidentally message the wrong parent?</h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            Once an SMS is delivered, it cannot be retracted — so double-check before sending. Please
            reach out to any recipient that receives a message in error to clarify what happened.
          </p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
          <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">Why do I see duplicate parent names?</h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            This can happen if the parent is listed for more than one child or uploaded more than once.
          </p>
          </section>

           <h1 className="text-5xl font-extrabold mb-6 text-center bg-gradient-to-r from-indigo-600 via-purple-500 to-emerald-500 bg-clip-text text-transparent drop-shadow-lg animate-gradient-x">
            Parents & Recipients
          </h1>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              Do parents need to download an app?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              No. Parents are meant to receive message updates via SMS or email. Retain any Notifly
              messages for future conversations, parent teacher conferences, formal emails or larger apps
              like Remind.
            </p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              What if a parent says they didn’t get my message?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Check the delivery status in the message log. Common reasons include opt-outs, changed
              numbers, or message limits.
            </p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#b4f0e0]/80 via-[#e0d9ff]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-emerald-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              Can parents opt out of messages?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Yes. Parents can reply STOP to SMS or click unsubscribe on emails. You’ll be notified in your
              app when this happens.
            </p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              How can I re-engage a parent who opted out?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              You’ll need to ask them (offline or in person) to text START to the Notifly number to resume
              messages or to opt back in at mynotifly.com.
            </p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              Can parents reply to Notifly messages?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Currently, parents do not reply to Notifly message updates. File attachments from parents are
              not supported.
            </p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#b4f0e0]/80 via-[#e0d9ff]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-emerald-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
            What is the expectation if parents cannot send a reply?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Often, a reply is not necessary. If a parent receives an update that a student “had great
              participation” or “arrived severely tardy”, that is usually enough information for parents to
              reinforce and follow up with at home. Teachers cannot stop to send formal emails or to reply.
              Notifly allows enough time to update and keep moving. Keep in mind that teachers manage
              growing numbers of students each year, and that other apps or methods may be used when
              time allows discussion. Typically, Notifly updates are discussed collectively between parent
              and teachers in conferences or emails and not after every occurrence.
            </p>
          </section>

           <h1 className="text-5xl font-extrabold mb-6 text-center bg-gradient-to-r from-indigo-600 via-purple-500 to-emerald-500 bg-clip-text text-transparent drop-shadow-lg animate-gradient-x">
            Technical Support
          </h1>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              My contacts aren’t uploading or failing
            </h3>
            <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed">
              <li>Check that the file is in CSV format.</li>
              <li>Make sure there are no extra spaces or missing fields.</li>
              <li>Use the exact Notifly template.</li>
              <li>Still stuck? Submit a ticket here.</li>
            </ul>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
            How to reset your password
            </h3>
            <ol className="list-decimal list-inside text-lg text-gray-700 leading-relaxed">
              <li>Click Forgot Password? on the login screen.</li>
              <li>Enter your school email.</li>
              <li>Check your inbox for the reset link.</li>
              <li>Create a new password.</li>
            </ol>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#b4f0e0]/80 via-[#e0d9ff]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-emerald-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              I can’t log in. What should I do?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Make sure you’re using your correct school credentials or reset your password. Still having
              issues? Email <b><a href="mailto:support@mynotifly.com" className="text-indigo-600 font-semibold underline">support@mynotifly.com</a></b>
            </p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              My messages aren’t sending
            </h3>
            <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed">
              <li>Confirm the recipient's phone number is valid.</li>
              <li>Confirm the recipient has opted in to receive messages.</li>
              <li>Some messages are delayed due to carrier filtering.</li>
              <li>Check that your limits are not exceeded for the month.</li>
            </ul>
          </section>
          
          
          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              Why your message might not have been delivered
            </h3>
            <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed">
              <li>Invalid or missing phone number</li>
              <li>Blocked numbers or opt-out</li>
              <li>Invalid or missing email</li>
              <li>Message content flagged as spam</li>
              <li>Daily message limit reached (limited to 3 email and 3 SMS per recipient per day)</li>
            </ul>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#b4f0e0]/80 via-[#e0d9ff]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-emerald-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              What browsers are supported?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              The latest versions of Chrome, Safari, Edge, and Firefox are supported. Internet Explorer is not.
            </p>
            <h4 className="text-xl font-extrabold mt-2  mb-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x leading-relaxed">Supported devices</h4>
            <p className="text-lg text-gray-700 leading-relaxed">Notifly works on:</p>
            <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed">
              <li>Mobile: Android 10+ and iOS 13+</li>
              <li>Tablets with updated browsers also supported</li>
            </ul>
        </section>

        <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
        <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
          Can I use Notifly on a school Chromebook?
        </h3>
        <p className="text-lg text-gray-700 leading-relaxed">
          Currently, Notifly is promoted as a mobile app only for most users. <br />
          For <strong>Admin</strong> – Yes, Notifly works in ChromeOS via browser — no app install required.
        </p>
      </section>

      <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#b4f0e0]/80 via-[#e0d9ff]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-emerald-300">
        <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
          Why do I see a blank page or spinner when logging in?
        </h3>
        <ul className="list-disc ml-5 space-y-1">
          <li>Try clearing your cache.</li>
          <li>Clear your browser history.</li>
          <li>Disable extensions.</li>
          <li>Log in via Incognito Mode.</li>
        </ul>
        <p className="mt-2">Still stuck? Contact support with your browser and device info.</p>
      </section>

      <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
        <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
          Can I resend a message to parents who didn’t get it?
        </h3>
        <p className="text-lg text-gray-700 leading-relaxed">
          Yes — provided they are currently opted in to receive messages.
        </p>
      </section>
          <h1 className="text-5xl font-extrabold mb-6 text-center bg-gradient-to-r from-indigo-600 via-purple-500 to-emerald-500 bg-clip-text text-transparent drop-shadow-lg animate-gradient-x">
            Privacy
          </h1>
           <p className="mb-8 text-center text-lg text-gray-700"><strong>Privacy, Permissions, and Securit</strong></p>


            <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
              <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              How Notifly protects your messages
              </h3>
              <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed">
                <li>All data is encrypted.</li>
                <li>Notifly is FERPA- and COPPA-aware</li>
                <li>We do not share contact info with third parties</li>
                <li>Only verified teachers and school leaders can send messages</li>
              </ul>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
                        How to reset your password
            </h3>
            <p  className="text-lg text-gray-700 leading-relaxed">Parent contact information is uploaded into Notifly by a user with prior authority and access to it through Learning Management Systems (LMS’s) and Student Information Systems (SIS’s). This
        is usually a teacher, administrator, or staff member. Only that individual has access to it when
        using the app.</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#b4f0e0]/80 via-[#e0d9ff]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-emerald-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
             Are phone numbers visible to others
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
            No. Individual teachers can see phone numbers, but parents cannot see each other’s information.
            </p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
              <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              Does Notifly comply with FERPA?
              </h3>
             <p className="text-lg text-gray-700 leading-relaxed">Yes. Notifly is designed to align with FERPA and COPPA guidelines. We do not sell or share student or parent data.</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              Who at my school can see my messages?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">Only you and designated school admins (if enabled) can view message content. Other teachers
do not see your communications.</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#b4f0e0]/80 via-[#e0d9ff]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-emerald-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
             Will Notifly show my phone number to parents?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
           No. Parents receive your messages from the dedicated Notifly number assigned to your school or account. Your personal number is never shared.</p>
          </section>

           <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
              <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
                Can I customize how my name appears?
              </h3>
             <p className="text-lg text-gray-700 leading-relaxed">Yes. Under <b>Profile Settings</b>, you can choose how your name appears (e.g., “Mr. Henderson,”
“Coach Michael,” or “Ms. Williams”).</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
               Can co-teachers use the same account?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">Each teacher should create their own account. You can share classes or contact lists, but not
logins</p>
          </section>


          <h1 className="text-5xl font-extrabold mb-6 text-center bg-gradient-to-r from-indigo-600 via-purple-500 to-emerald-500 bg-clip-text text-transparent drop-shadow-lg animate-gradient-x">
            Behavioral & Strategic FAQs
          </h1>

            <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
              <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              What’s the best time of day to send messages?
              </h3>
             <p className="text-lg text-gray-700 leading-relaxed">We recommend sending messages <b>between 8:00 AM and 6:00 PM</b> for best response rates. Avoid late-night or early morning messages unless urgent.</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
                       How often should I message parents?
            </h3>
            <p  className="text-lg text-gray-700 leading-relaxed">Keep it consistent but not overwhelming. A good cadence is 1–2 times per week.
Prioritize updates that are timely, relevant, and actionable.</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#b4f0e0]/80 via-[#e0d9ff]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-emerald-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
             What should I avoid sending through Notifly?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">Avoid:</p>
             <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed">
                <li>Grade disputes or sensitive disciplinary matter</li>
                <li>Highly emotional or accusatory messages</li>
                <li>Any confidential student data (FERPA-sensitive) Instead, request a phone call or conference when appropriate.</li>
              </ul>
          </section>

           <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
              <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              Can I use Notifly for classroom newsletters or homework reminders?
              </h3>
             <p className="text-lg text-gray-700 leading-relaxed">Yes — you can send weekly overviews, reminders, or recurring updates. If it helps
parents stay in the loop, it’s a perfect use case.</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
                When should I NOT use Notifly?
            </h3>
            <p  className="text-lg text-gray-700 leading-relaxed">Notifly isn’t for:</p>
            <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed">
                <li>Emergency or time-sensitive alerts (use school-approved systems)</li>
                <li>Direct student messaging (Notifly is for staff → parent communication)</li>
                <li>Replacing report cards or formal documentation</li>
              </ul>
          </section>

          {/* admin faq */}
           <h1 className="text-5xl font-extrabold mb-6 text-center bg-gradient-to-r from-indigo-600 via-purple-500 to-emerald-500 bg-clip-text text-transparent drop-shadow-lg animate-gradient-x">
            Admin
          </h1>
           <p className="mb-8 text-center text-lg text-gray-700">
            <strong>  Admin & Policy-Related FAQs</strong> 
          </p>
            <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
              <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
                What happens if a teacher leaves the school?
              </h3>
             <p className="text-lg text-gray-700 leading-relaxed">Admins can <b>remove the teacher</b> or staff member on the admin panel. Deleted accounts retain message history for auditing.</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
                 What happens if a teacher joins the school after initial onboarding?
            </h3>
            <p  className="text-lg text-gray-700 leading-relaxed">Admins can add the teacher or staff member on the admin panel.</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#b4f0e0]/80 via-[#e0d9ff]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-emerald-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              Can I edit message templates?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">Yes — on the admin dashboard go to “Templates,” click the pencil icon, and adjust any
phrasing. You can also save custom templates</p>
          </section>

           <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
              <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
                 Does Notifly integrate with my gradebook or SIS?
              </h3>
             <p className="text-lg text-gray-700 leading-relaxed">At this time, the current version does not support CSV imports from Aspen and Clever. Direct
integrations are planned for future releases.</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
                How do I add or edit contact info from the original spreadsheet?
            </h3>
            <p  className="text-lg text-gray-700 leading-relaxed">For iPhone, for example, go to Files ‘your spreadsheet’. Then manually enter the new contact
info. Ensure the file follows the formatting template. Upload the updated spreadsheet in theNotifly app.</p>
          </section>

          {/* billing section */}
          <h1 className="text-5xl font-extrabold mb-6 text-center bg-gradient-to-r from-indigo-600 via-purple-500 to-emerald-500 bg-clip-text text-transparent drop-shadow-lg animate-gradient-x">
            Billing
          </h1>
           <p className="mb-8 text-center text-lg text-gray-700">
            <strong>Notifly User Billing FAQ (for Teachers & Staff)</strong> 
          </p>
          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
              <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
                Is Notifly free to use?
              </h3>
             <p className="text-lg text-gray-700 leading-relaxed">Yes, Notifly offers a free subscription plan. Paid subscriptions are also available with higher message limits and premium features.</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
                What plans does Notifly offer?
            </h3>
            <p  className="text-lg text-gray-700 leading-relaxed">Notifly offers three subscription tiers:</p>
               <ul className="list-disc list-inside">
                <li><b>Free</b> (Teacher Tier) — basic messaging capabilities. 25 SMS/mo & 25 email/mo</li>
                <li><b>Pro —</b> enhanced communication features. 50 SMS/mo & 500 email/mo</li>
                <li><b>Max —</b> full suite including analytics and automation. 100 SMS/mo & 1000 email/mo</li>
              </ul>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#b4f0e0]/80 via-[#e0d9ff]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-emerald-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              How does billing work for individual users?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">Notifly offers three subscription tiers:</p>
             <ul className="list-disc list-inside">
              <li>Free: $0/month — limited messages and basic features.</li>
              <li>Pro: $5.99/month — higher messaging limits and advanced tools.</li>
              <li>Max: $8.99/month — full access, priority support, and advanced analytics.</li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed">You’ll be billed monthly on the date you subscribed.</p>
          </section>

           <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
              <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
                 How do I upgrade from Free to Pro or Max?
              </h3>
             <p className="text-lg text-gray-700 leading-relaxed">You can upgrade anytime in the app under <b>Upgrade Subscription.</b> Payment is securely processed via Stripe using credit/debit cards or Apple Pay.</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
               Is there a yearly billing option?
            </h3>
            <p  className="text-lg text-gray-700 leading-relaxed">Yes. Yearly plans offer discounted rates compared to monthly billing. You can switch to annual
billing from your subscription page</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
              <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
               Will I lose my data or messages if I cancel my plan?
              </h3>
             <p className="text-lg text-gray-700 leading-relaxed">You won’t lose your account, but certain features (like engagement reports, analytics or message history) will become inaccessible unless re-upgraded.</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
                What happens if I use all my SMS or email credits?
            </h3>
            <p  className="text-lg text-gray-700 leading-relaxed">You can purchase additional SMS and email credits directly in the app under <b>Recharge
Credits</b>. Unused credits do not roll over from month to month.</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#b4f0e0]/80 via-[#e0d9ff]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-emerald-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              Why was I charged this month?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">You may have an active Pro or Max plan. Check your subscription settings under <b>Billing.</b></p>
          </section>

           <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
              <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
                 Do you offer refunds?
              </h3>
             <p className="text-lg text-gray-700 leading-relaxed">Refunds are not issued for partial months. If you cancel mid-month, your subscription remains active until the end of the billing cycle.</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
               Can my school or district pay for my subscription?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">Yes! Notifly offers school/district licenses. If your organization is interested, please have an administrator contact us at sales@notiflyapp.com.</p>
          </section>

           <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
              <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
               Will I receive a receipt or invoice?
              </h3>
             <p className="text-lg text-gray-700 leading-relaxed">Yes. A receipt is automatically emailed to you after each payment. You can also request past
invoices by contacting <b><a href="mailtobilling@mynotifly.com">billing@mynotifly.com</a></b></p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
                Is my subscription recurring?
            </h3>
            <p  className="text-lg text-gray-700 leading-relaxed">Yes. All paid plans are automatically billed each month unless canceled</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#b4f0e0]/80 via-[#e0d9ff]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-emerald-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              How can I cancel my subscription?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">You can cancel anytime in your account settings. Your access will continue until the end of your current billing cycle.</p>
          </section>

           <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
              <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
                Will I receive a receipt or invoice?
              </h3>
             <p className="text-lg text-gray-700 leading-relaxed">Yes. A receipt is automatically emailed to you after each payment. You can also request past invoices by contacting <b><a href="mailtobilling@mynotifly.com">billing@mynotifly.com</a></b></p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
               Is my subscription recurring?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">Yes. All paid plans are automatically billed each month unless canceled.</p>
          </section>

           <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
              <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
                How can I cancel my subscription?
              </h3>
             <p className="text-lg text-gray-700 leading-relaxed">You can cancel anytime in your account settings. Your access will continue until the end of your current billing cycle.</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
                 What happens if I use up all my credits?
            </h3>
            <p  className="text-lg text-gray-700 leading-relaxed">All plans come with monthly message credits. If you reach your limit:<br />
You’ll receive a warning notification.<br />
You can Upgrade Subscription or purchase additional credits through your dashboard.</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#b4f0e0]/80 via-[#e0d9ff]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-emerald-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              How are message credits calculated?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">Message credits are used for sending SMS and email messages. One credit = one outbound message to a single contact.</p>
          </section>

           <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
              <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
                What is “Recharge Credits”?
              </h3>
             <p className="text-lg text-gray-700 leading-relaxed">f you run out of included credits before the end of the month, you can purchase more without upgrading your plan. This is called a credit recharge.</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
               Do schools pay a different rate?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">Yes. Schools and districts receive group rates. Contact <b><a href="mailto:sales@mynotifly.com">sales@mynotifly.com</a></b> for a custom quote based on staff size.</p>
          </section>

           <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
              <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
                Can I change my plan at any time?
              </h3>
             <p className="text-lg text-gray-700 leading-relaxed">Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect at the
start of your next billing cycle.</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
                What happens if I need support with billing?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">Our team is here to help. Email <b><a href="mailto:billing@mynotifly.com">billing@mynotifly.com</a></b> and we’ll respond within 24-48 hours.
</p>
          </section>

          {/* parent section start */}
           <h1 className="text-5xl font-extrabold mb-6 text-center bg-gradient-to-r from-indigo-600 via-purple-500 to-emerald-500 bg-clip-text text-transparent drop-shadow-lg animate-gradient-x">
            Parents
          </h1>
           <p className="mb-8 text-center text-lg text-gray-700">
            <strong>Notifly Parent FAQ (For Awareness Only)</strong> 
          </p>
          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
              <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
                What is Notifly?
              </h3>
             <p className="text-lg text-gray-700 leading-relaxed">Notifly is a communication tool used by educators to streamline outreach to families and staff. It’s built for professional, one-way messaging—delivering timely information through SMS or email.</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              Do I need to download or sign up for anything?
            </h3>
            <p  className="text-lg text-gray-700 leading-relaxed">No. Parents do not need to create an account or install an app. You’ll receive messages from
your child’s school or teacher directly via text or email.</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#b4f0e0]/80 via-[#e0d9ff]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-emerald-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              How is this different from large apps like Remind or ParentSquare?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">Notifly focuses exclusively on empowering teachers and staff—not on parent-side apps, student
accounts, or portals. It delivers fast, direct communication without requiring any parent or student setup.</p>
          </section>

           <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
              <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
                 How did someone get my number to use in this app?
              </h3>
             <p className="text-lg text-gray-700 leading-relaxed">Parent contact information is uploaded into Notifly by a user with prior authority and access to it through Learning Management Systems (LMS’s) and Student Information Systems (SIS’s). This is usually a teacher, administrator, or staff member. Only that individual has access to it when using the app.</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
               Are phone numbers visible to others?
            </h3>
            <p  className="text-lg text-gray-700 leading-relaxed">No. Individual teachers can see phone numbers, but parents cannot see each other’s
information.</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
              <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
                Is my phone number or email safe?
              </h3>
             <p className="text-lg text-gray-700 leading-relaxed">Yes. Notifly complies with all federal student privacy laws and does not sell or share contact
information. Your information is only used for school communication purposes.</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
              <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
                Can I reply to messages sent through Notifly?
              </h3>
             <p className="text-lg text-gray-700 leading-relaxed">Notifly messages are one-way updates. If a reply is required, your teacher will follow up with you in a traditional manner like email, conference, or phone call.</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              What is the expectation if I cannot send a reply?
            </h3>
            <p  className="text-lg text-gray-700 leading-relaxed">Often, a reply is not necessary. If a parent receives an update that a student “had great
participation” or “arrived severely tardy”, that is usually enough information for parents to reinforce and follow up with at home. Teachers cannot stop to send formal emails or to reply. Notifly allows enough time to update and keep moving. Keep in mind that teachers manage growing numbers of students each year, and that other apps or methods may be used when time allows discussion. Typically, Notifly updates are discussed collectively between parent and teachers in conferences or emails and not after every occurrence.</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#b4f0e0]/80 via-[#e0d9ff]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-emerald-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              What should I do until I have a formal discussion with a teacher about my Notiflyupdates?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">Please save your Notifly messages. You may be able to notice trends or be prepared with
suggestions during your next meeting with a teacher.</p>
          </section>

           <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
              <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
                 Who should I contact if I have questions about messages I receive?
              </h3>
             <p className="text-lg text-gray-700 leading-relaxed">Please reach out directly to your child’s teacher or school. Notifly is the tool they use, but they manage the content and distribution. Replies are subject to the teacher's availability. Please be advised that many teachers plan to address Notifly messages during formal communication methods like Remind, ParentSquare, email, phone calls, parent teacher conferences, and other
meetings.</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
               What types of messages will I receive?
            </h3>
            <p  className="text-lg text-gray-700 leading-relaxed">Messages may include reminders about class activities, attendance, behavior notes, updates on
student progress, or important school announcements.</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
              <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
                How many messages can I receive in one day?
              </h3>
             <p className="text-lg text-gray-700 leading-relaxed">Currently the app supports sending 3 messages per day per parent. This limit keeps
communication manageable for parents that receive messages throughout the day from multiple educators.</p>
          </section>
          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
              <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
                Can I opt out of receiving texts or emails from Notifly?
              </h3>
             <p className="text-lg text-gray-700 leading-relaxed">Yes, you can opt out:</p>
              <ul className="list-disc list-inside">
                <li>For SMS: Reply STOP to any Notifly text to stop receiving further texts.</li>
                <li>For email: Use the “unsubscribe” link at the bottom of any email.</li>
              </ul>
            <p className="text-lg text-gray-700 leading-relaxed">Please note: opting out may cause you to miss time-sensitive or important information.
s</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              What should I do if I accidentally unsubscribe or want to rejoin?
            </h3>
            <p  className="text-lg text-gray-700 leading-relaxed">You opt back in at <b><a href="mynotifly.com" target="_blank">mynotifly.com</a></b> or text “START” to the dedicated Notifly number</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#b4f0e0]/80 via-[#e0d9ff]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-emerald-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              When can I follow up or ask questions about something sent through Notifly?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">Teachers may reference opportunities like Parent-Teacher Conferences, phone calls, or emails
in their messages. If not, you can always contact the teacher or school directly through their usual communication channels</p>
          </section>

           <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
              <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
                 Is my contact information secure?
              </h3>
             <p className="text-lg text-gray-700 leading-relaxed">Yes. Notifly takes data privacy seriously and complies with all applicable federal and state
education privacy laws, including FERPA and COPPA. Your personal information is never sold or shared with third parties</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
               How do I know the message really came from the school?
            </h3>
            <p  className="text-lg text-gray-700 leading-relaxed">All Notifly messages are sent by verified staff members through an authenticated school
account. If something seems unclear or suspicious, contact the school to verify the message</p>
          </section>

          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#f9e7ff]/80 via-[#e0d9ff]/70 to-[#b4f0e0]/80 p-6 shadow-lg border-l-4 border-purple-300">
              <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
               How will I know where messages are coming from?
              </h3>
              <ul>
                <li>Each message includes your name or your child’s name, as well as the name of the educator (e.g., “Mr. Thomas”).</li>
                <li>SMS messages are sent from a dedicated Notifly number, usually preceded by the word “Notifly:”.</li>
                <li>Parents should set the name of the dedicated Notifly number to “Notifly” for future communication identification purposes.</li>
              </ul>
             <p className="text-lg text-gray-700 leading-relaxed">Ask parents to set the name of the dedicated Notifly number to “Notifly” for future
communication identification purposes.</p>
          </section>
          
          <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#e0d9ff]/80 via-[#b4f0e0]/70 to-[#f9e7ff]/80 p-6 shadow-lg border-l-4 border-indigo-300">
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
              Still need help?
            </h3>
            <p  className="text-lg text-gray-700 leading-relaxed">Visit the <b>Help Center Home</b> or <b>click “Submit a Request”</b> to get support from our team.</p>
            <p  className="text-lg text-gray-700 leading-relaxed">You can also email: <b><a href="mailto:support@notiflyapp.com">support@notiflyapp.com</a></b></p>
          </section>

          </div>

        </div>
      <Footer />
    </>
  );
}