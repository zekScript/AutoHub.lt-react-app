import React from "react";

const Faqs = () => {
  const faqs = [
    {
      id: "account",
      question: "How do I create an account?",
      answer:
        "Click the 'Sign Up' button on the top right, fill in your details, and you’re ready to go!"
    },
    {
      id: "tickets",
      question: "How do I create a support ticket?",
      answer:
        "Go to the 'Make Ticket' page from the navigation bar, fill in your issue, and submit. Our team will respond quickly."
    },
    {
      id: "reset",
      question: "How can I reset my password?",
      answer:
        "Unfortunately we can't currently reset passwords, because this is the project site."
    },
    {
      id: "contact",
      question: "How can I contact support directly?",
      answer:
        "You can reach out via email at admin@gmail.com or open a priority ticket if you’re a premium user."
    }
  ];

  return (
    <div className="container py-5">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 mb-4">
          <div className="list-group sticky-top">
            {faqs.map((faq) => (
              <a
                key={faq.id}
                href={`#${faq.id}`}
                className="list-group-item list-group-item-action"
              >
                {faq.question}
              </a>
            ))}
          </div>
        </div>

        {/* FAQ Content */}
        <div className="col-md-9">
          <h1 className="mb-4 fw-bold">Frequently Asked Questions</h1>
          {faqs.map((faq) => (
            <div id={faq.id} key={faq.id} className="mb-5">
              <h3 className="text-muted">{faq.question}</h3>
              <p className="lead">{faq.answer}</p>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faqs;
