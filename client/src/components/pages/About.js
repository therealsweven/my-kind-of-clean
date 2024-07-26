import React from "react";

const About = () => {
  return (
    <>
      <h1
        className="text-info text-4xl py-3 text-center border-b-2"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1585933646706-7b629be871aa?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      >
        About
      </h1>
      <div className="flex flex-col-reverse md:flex-row lg:flex-row">
        <div className="text-justify py-6 px-10 md:px-24 lg:px-24">
          <p>
            Hi, my name is Angelica Levy, owner of My Kind of Clean. My vision
            is to offer a comprehensive range of cleaning services that not only
            meets but exceeds expectations of clients throughout Denver and
            surrounding areas.
          </p>
          <br></br>
          <p>
            I started my small business with the passion for cleaning and
            helping others in the northwest Chicago land area in 2018. I began
            with just two Airbnb properties. As a mother to four, I wanted to
            gain back control over my work to home life balance. After four
            accomplishing years, I was able to make my dreams of traveling come
            true. I took my small business on the road from Illinois and Indiana
            to Arizona and now to Colorado. Cleaning and organizing was
            something I always had an eye for since I was little. Never would I
            have thought it would pay off BIG.
          </p>
          <br></br>
          <p>
            As a holistic guru I became aware of the exposure to harmful
            chemicals while offering such a range of services. This encouraged
            me to include my holistic hobbies into my small business. I offer my
            all organic homemade cleaning products for those concerned about
            exposure to harmful chemicals. I can use them for your cleanings and
            you can purchase them for your everyday use.{" "}
          </p>
          <br></br>
          <p>
            In the course of my life, I have developed skills always directed to
            customer service from being a waitress, bartender, event
            coordinator, operations manager and small business owner. My
            reputation is a reflection of hard work, dedication, and commitment
            to providing exceptional cleaning services. As my company
            flourishes, I never lose sight of my core values and mission to my
            community. Through my hard work and trust I have earned from all of
            my clients my cleaning company has become a symbol of reliability
            and excellence.
          </p>
          <br></br>
          <p>
            {" "}
            My story showcases the power of determination and the ability to
            adapt and grow in a competitive industry. Here at My Kind of Clean
            we strive to leave no dirt behind as we clean it like we mean it!
          </p>
          <br></br>
        </div>
        <div className="flex flex-col justify-center px-8">
          <img
            className="rounded-full"
            src="https://i.ibb.co/gRxVf7n/441312089-979466587521789-8280812821867300159-n.jpg"
          ></img>
        </div>
      </div>
    </>
  );
};

export default About;
