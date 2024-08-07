import React from 'react';

const FaqItem = ({number, title, text}) => {
    return (
        <div className="accordion-item">
            <h3 className="accordion-header" id={`heading${number}`}>
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target={`#collapse${number}`} aria-expanded="true" aria-controls={`collapse${number}`}>
                    {title}
                </button>
            </h3>
            <div id={`collapse${number}`} className="accordion-collapse collapse" aria-labelledby={`heading${number}`}
                 data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                    {text}
                </div>
            </div>
        </div>
    );
};

export default FaqItem;