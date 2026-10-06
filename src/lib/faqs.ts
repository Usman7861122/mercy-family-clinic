// Frequently asked questions for each service (based on the current website's content).
// Dr. Izzy should review the medical wording before launch.

export interface Faq {
  q: string;
  a: string;
}

const howToStart: Faq = {
  q: "How do I make an appointment?",
  a: "Call us at 214-942-2377, or send an appointment request on our Contact page. We will call you to confirm a time. We are open Monday to Friday, 9 AM to 5 PM.",
};

export const faqs: Record<string, Faq[]> = {
  "medical-weight-loss": [
    {
      q: "What is Wegovy (semaglutide)?",
      a: "Wegovy is a weekly injection that the FDA approved in June 2021 for long-term weight management. It copies GLP-1, a hormone that helps control your appetite and how much you eat. It also helps your body make insulin and lowers blood sugar.",
    },
    {
      q: "How does the treatment work?",
      a: "It slows how fast your stomach empties so you feel full, slows movement in the intestines, lowers the sugar your liver makes, and helps your pancreas release insulin.",
    },
    {
      q: "How much weight can I lose?",
      a: "Results are different for everyone. With a healthy diet and exercise, patients often lose an average of 2 to 4 pounds a week. We start with a low dose and raise it slowly over 16 to 20 weeks, up to 2.4 mg each week.",
    },
    {
      q: "What side effects are possible?",
      a: "The most common side effects are mild: tiredness, nausea, constipation and diarrhea.",
    },
    {
      q: "Am I a good candidate?",
      a: "We check your medical history, current medicines, vital signs and BMI first. Some people are not good candidates, for example people with diabetic retinopathy, a history of medullary thyroid cancer, pancreatitis, or certain other conditions.",
    },
    {
      q: "Do you offer other weight loss options?",
      a: "Yes. We also offer Mounjaro, B-12 and lipotropic injections, and the medicines Adipex, Qsymia and Contrave.",
    },
    howToStart,
  ],
  "family-medicine": [
    {
      q: "What is family medicine?",
      a: "Family medicine doctors finish at least three more years of training after medical school. They care for the whole family, so you do not need a different specialist for each person.",
    },
    {
      q: "Who can see a family doctor?",
      a: "Everyone. We care for patients of all ages, from babies to seniors, and follow them through every stage of life.",
    },
    {
      q: "What can a family doctor treat?",
      a: "Yearly and sports physicals, well-child checks, well-woman exams, infections like colds and UTIs, asthma, COPD and emphysema, diabetes, high blood pressure and heart disease, high cholesterol, vaccinations, allergy testing and minor injuries.",
    },
    {
      q: "Can I come to you instead of the emergency room?",
      a: "For minor illnesses and injuries, yes. You can usually get a quick appointment with us instead of going to the emergency room. For an emergency, call 911.",
    },
    howToStart,
  ],
  pediatrics: [
    {
      q: "What does pediatric care include?",
      a: "Physical exams, vaccines, sports physicals, sick visits, and tracking your child's growth and development from infancy through the teen years.",
    },
    {
      q: "How often should my child have checkups?",
      a: "Visits are recommended at 2 weeks, and then at 2, 4, 6, 9, 12, 15, 18, 24 and 36 months. After age 3, a well-child visit is recommended every year.",
    },
    {
      q: "What shots does my child need?",
      a: "Dr. Izzy follows CDC guidelines for each age. Some vaccines need more than one dose. Please bring your child's immunization records to the first visit.",
    },
    {
      q: "When should I see the doctor right away?",
      a: "Get medical help if a baby under 3 months has a rectal temperature of 100.4°F or higher, or if an older child's temperature is above 102.2°F. Also come in for changes in behavior. For an emergency, call 911.",
    },
    {
      q: "Do you do sports and school physicals?",
      a: "Yes. We also help with the shots that daycares and schools require.",
    },
    howToStart,
  ],
  diabetes: [
    {
      q: "What is diabetes?",
      a: "Your pancreas makes insulin to move glucose (sugar) from your blood into your cells for energy. With diabetes, your body does not make enough insulin or cannot use it well, so blood sugar rises.",
    },
    {
      q: "What is the difference between type 1 and type 2?",
      a: "Type 1 is an autoimmune condition that often starts in childhood and needs insulin. Type 2 is the most common form. It usually develops later and is linked to genes and lifestyle.",
    },
    {
      q: "Who is at risk?",
      a: "People who are overweight, inactive, older than 45, have a family history of diabetes, or are of African-American, Asian-American or Hispanic descent.",
    },
    {
      q: "Can prediabetes be reversed?",
      a: "Yes. Prediabetes comes before type 2 diabetes and can still be reversed. Being more active and losing weight can lower your risk. Diabetes itself is a life-long condition.",
    },
    {
      q: "What problems can uncontrolled diabetes cause?",
      a: "Heart disease, nerve damage, kidney damage, eye damage and wounds that do not heal. Good care lowers these risks.",
    },
    {
      q: "How can you help me manage diabetes?",
      a: "We build a personal plan for your medicine, lifestyle and nutrition, with regular follow-up. Healthy eating and regular exercise help control symptoms.",
    },
    howToStart,
  ],
  "womens-health": [
    {
      q: "What is a women's health checkup?",
      a: "It is preventive care that focuses on your reproductive health. It usually includes a pelvic exam and a clinical breast exam, and it is a good time to talk about any worries.",
    },
    {
      q: "Who needs one, and how often?",
      a: "All women should start in their teen years and continue every year, even after menopause.",
    },
    {
      q: "What happens during the exam?",
      a: "We review your medical history, check height, weight and BMI, and do a pelvic exam, a clinical breast exam, a Pap smear, and blood and urine screening. Other tests, such as a bone density scan, may be advised.",
    },
    {
      q: "Can I get vaccines at the exam?",
      a: "Yes. Vaccines such as the HPV vaccine can be given during your visit.",
    },
    {
      q: "When should I call right away?",
      a: "Call us promptly for severe period pain, unusual bleeding between periods, periods that last longer than usual, burning or painful urination, vaginal swelling, pain or discharge, lumps in vaginal tissue, or pelvic pressure.",
    },
    howToStart,
  ],
  "physical-exams": [
    {
      q: "What is a physical exam?",
      a: "It is a series of checks to see how healthy you are overall. It can also find early signs of problems such as high blood pressure and type 2 diabetes.",
    },
    {
      q: "How often do I need one?",
      a: "Most people should have a physical every year. Children may also need school or sports physicals.",
    },
    {
      q: "Do you do work, school and sports physicals?",
      a: "Yes. We do physicals for work, school, sports and general wellness for the whole family.",
    },
    {
      q: "What happens during a physical?",
      a: "We review your medical history and check your blood pressure, heart rate and temperature, your heart and lungs, vision, hearing and mobility. Some exams also include checks specific to men or women.",
    },
    {
      q: "How should I get ready?",
      a: "Be ready to talk about your exercise, nutrition and substance use.",
    },
    howToStart,
  ],
  immunizations: [
    {
      q: "What are immunizations?",
      a: "An immunization gives your body a weakened or inactive form of a germ, so it learns to make antibodies without making you sick.",
    },
    {
      q: "Why are they important?",
      a: "They stop the spread of preventable diseases and keep the community healthy. Diseases like polio and measles are now very rare because of vaccines.",
    },
    {
      q: "Which shots does my child need?",
      a: "Daycares and schools often require certain vaccines. The CDC publishes age-based schedules, and we help you choose the right shots. Some need more than one dose as your child's immune system grows.",
    },
    {
      q: "Do adults need shots?",
      a: "Yes. Adults should get a flu shot every year. If you travel abroad, you may need other vaccines for diseases that are rare here but a risk in other countries.",
    },
    howToStart,
  ],
  hypertension: [
    {
      q: "What is hypertension?",
      a: "Hypertension is the medical word for high blood pressure. It happens when the force of blood against your artery walls stays high.",
    },
    {
      q: "What is a healthy blood pressure?",
      a: "An ideal reading is near or below 120/80. A reading that stays at 140/90 or higher raises your risk of heart and blood vessel damage.",
    },
    {
      q: "What are the risk factors?",
      a: "Being older than 50, being overweight, being inactive, tobacco use, drinking alcohol every day, a family history of high blood pressure, African descent, and high cholesterol.",
    },
    {
      q: "What problems can it cause?",
      a: "Over time, uncontrolled high blood pressure can lead to aneurysm, heart attack, stroke, heart failure, kidney damage or eye damage.",
    },
    {
      q: "How is it treated?",
      a: "With medicine and lifestyle changes. Eat a heart-healthy, low-sodium diet with whole grains, fruits and vegetables, and stay physically active. We will help you find the right plan.",
    },
    howToStart,
  ],
  "in-office-diagnostic-testing": [
    {
      q: "Which tests do you do in the office?",
      a: "Allergy testing, ankle-brachial index (ABI) test, flu test, routine blood work, strep throat test, EKG, urinalysis, cholesterol screen, diabetes screen and diabetic eye exam.",
    },
    {
      q: "Do I need to go to a separate lab?",
      a: "No. You can get many tests right here at the clinic, so you do not need to stop at several places.",
    },
    {
      q: "How fast are the results?",
      a: "Many tests, such as EKG and urinalysis, give quick results, so you often do not need a return visit.",
    },
    {
      q: "Who benefits from in-office testing?",
      a: "People with sudden illnesses such as flu or strep throat, and people managing long-term conditions like diabetes and high cholesterol.",
    },
    {
      q: "Do you do diabetic eye exams?",
      a: "Yes. A diabetic eye exam is needed every year, and we can do it in the office.",
    },
    howToStart,
  ],
};
