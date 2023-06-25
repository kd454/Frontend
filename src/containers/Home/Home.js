import React, { useEffect, useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import VecotBanner from "../../assets/images/banner.svg";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import Pattern from "../../assets/images/pattern.svg";
import Black from "../../assets/images/black.svg";
import LocationSvg from "../../assets/images/location.svg";
import RupeeSvg from "../../assets/images/rupee.svg";
import PersonsSvg from "../../assets/images/persons.svg";
import TimerSvg from "../../assets/images/timer.svg";
import WifySvg from "../../assets/images/wify.svg";
import CurvSvg from "../../assets/images/curv.svg";
import leftPatternBanner from "../../assets/images/leftPatternBanner.svg";
import rightPatternBanner from "../../assets/images/rightPatternBanner.svg";
import paperPattern from "../../assets/images/paper-plane 1.svg";
import AboutImg from "../../assets/images/Student stress-pana 1.png";
import Img_360_degree from "../../assets/images/360_degree_img.png";
import { BsArrowUpLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import OfferCard from "../../components/OfferCard/OfferCard";
import TestimonialCard from "../../components/TestimonialCard/TestimonialCard";
import SearchInput from "../../components/SearchInput/SearchInput";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs, getImpact } from "../../Redux/actions/homeAction";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import { ToastContainer, toast } from "react-toastify";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// import required modules
import { Autoplay, Pagination } from "swiper";

const Home = () => {
  const stateData = useSelector((state) => state.homeRedu);
  const loginState = useSelector((state) => state.loginRedu);
  const { totalTeachers, totalStudents, totalConnected } = stateData.data;
  const [counterOn, setCounterOn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!stateData?.data?.totalStudents) {
      dispatch(getImpact());
    }
  }, [stateData?.data?.totalStudents]);
  useEffect(() => {
    if (!stateData?.blogs?.length) {
      dispatch(getBlogs());
    }
  }, [stateData?.blogs?.length]);

  return (
    <>
      <Header backColor="#FBD37A" />
      <ToastContainer />

      {/* banner section */}
      <section
        className="banner d-flex flex-column justify-content-center"
        id="banner"
      >
        <div className="row top-bar align-items-center">
          <div className="col-12 col-md-6 col-lg-6 left">
            <div className="content">
              <h1 className="heading">
                Better<span className="color-text">Connect</span>
              </h1>
              <h1 className="heading">
                Better<span className="color-text">Learning</span>
              </h1>
              <h1 className="heading">
                Better<span className="color-text">Development</span>
              </h1>
            </div>
          </div>
          <img src={paperPattern} alt="" className="paper-plane" />
          <div className="col-12 col-md-6 col-lg-6 right">
            <div className="content">
              <p>
                <RiDoubleQuotesL className="left" />
                Every teacher has a different style of teaching & Every student
                has a different Learning curve. We are here to Connect them in a
                Better manner.
                <RiDoubleQuotesR className="right" />
              </p>
            </div>
          </div>
        </div>
        <SearchInput />
        <div className="img-part">
          <img src={VecotBanner} alt="vector-banner" />
        </div>
        <img className="leftPattern" src={leftPatternBanner} alt="" />
        <img className="rightPattern" src={rightPatternBanner} alt="" />
      </section>

      {/* 360 degree section */}
      <section className="three_six_degree">
        <div className="title">
          <img src={Black} alt="pattern" />
          <span className="content">
            We <span className="color-text">offer </span>
            <span className="number">
              360<span className="round-degree"></span>{" "}
            </span>
            classes
          </span>
          <p>
            When it comes to classes we have everything you name it & we have
          </p>
        </div>
        <div className="img-part">
          <img src={Img_360_degree} alt="360_degree_img" />
        </div>
      </section>

      {/* get connect section */}
      <section className="get-connect">
        <div className="title">
          <img src={Pattern} alt="pattern" />
          <span className="content">
            Get <span className="color-text">connected</span> on the basis of
          </span>
        </div>
        <div className="inner-pattern d-flex justify-content-between">
          <div className="horizontal-line"></div>
          <div className="location part d-flex flex-column align-items-center justify-content-center">
            <label className="title-text top">Teacher near you</label>
            <div className="icon d-flex align-items-center justify-content-center">
              <img src={LocationSvg} alt="" />
            </div>
            <div className="vertical-line top-line"></div>
          </div>
          <div className="budget part d-flex flex-column align-items-center justify-content-center">
            <label className="title-text bottom">Fee Budget</label>
            <div className="icon d-flex align-items-center justify-content-center">
              <img src={RupeeSvg} alt="" />
            </div>
            <div className="vertical-line bottom-line"> </div>
          </div>
          <div className="size part d-flex flex-column align-items-center justify-content-center">
            <label className="title-text top">Batch size</label>
            <div className="icon d-flex align-items-center justify-content-center">
              <img src={PersonsSvg} alt="" />
            </div>
            <div className="vertical-line top-line"></div>
          </div>
          <div className="class part d-flex flex-column align-items-center justify-content-center">
            <label className="title-text bottom">Suitable class time</label>
            <div className="icon d-flex align-items-center justify-content-center">
              <img src={TimerSvg} alt="" />
            </div>
            <div className="vertical-line bottom-line"> </div>
          </div>
          <div className="learning part d-flex flex-column align-items-center justify-content-center">
            <label className="title-text top">Learning curve</label>
            <div className="icon d-flex align-items-center justify-content-center">
              <img src={CurvSvg} alt="" />
            </div>
            <div className="vertical-line top-line"></div>
          </div>
          <div className="online-offline part d-flex flex-column align-items-center justify-content-center">
            <label className="title-text bottom">
              Offline/Hometutor/Online
            </label>
            <div className="icon d-flex align-items-center justify-content-center">
              <img src={WifySvg} alt="" />
            </div>
            <div className="vertical-line bottom-line"> </div>
          </div>
        </div>
      </section>

      {/* about us section */}
      <section className="about-us" id="about">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-6 left">
            <img src={AboutImg} alt="" />
          </div>
          <div className="col-12 col-md-6 col-lg-6 right">
            <div className="content">
              <div className="title">
                <img src={Black} alt="pattern" />
                <h2>Who are we and Why should you choose us?</h2>
              </div>
              <p className="content-1 d-flex ">
                <div className="outer mt-2"></div>
                <span className="text">
                  We are building largest teacher student community in India.
                </span>
              </p>
              <p className="content-2 d-flex ">
                <div className="outer mt-2"></div>
                <span className="text">
                  We are trying to help school teacher, home tutor & other
                  freelancer teacher to increase their visibility & reach to
                  students.
                </span>
              </p>
              <div className="mission">
                <span className="head">Mission</span>
                <p className="content">Structure the offline Tution.</p>
              </div>
              <div className="vision">
                <span className="head">Vision</span>
                <p className="content">
                  To make students and parents aware of each and every option
                  they can avail to get assistance in holistic development of
                  child.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* teacher offer section */}
      <section className="offer">
        <div className="grid-content">
          <div className="title-card">
            <div className="title">
              <img src={Pattern} alt="pattern" />
              Our <span className="color-text">offering</span> to a Teacher
              <p className="sub-title">
                Only for those who teach out of passion or as a service towards
                society & not only to make money out of it
              </p>
              <button className="btn">
                <Link to="/teacher/register">
                  Register as teacher
                  <BsArrowUpLeft />
                </Link>
              </button>
            </div>
          </div>
          <OfferCard
            title="Zero Commission "
            content="We don't take anything from your pie."
          />
          <OfferCard
            title="Grow Student Base"
            content="There might be hundreds of students located near your class location but only 5-10 knows you. Here you are missing the opportunity to connect with the rest of 90 potential students. We are there to reach out to every potential student."
          />
          <OfferCard
            title="Zero Interference"
            content="We understand every teacher has its own set of teaching and operational patterns and we never try to intervene into it."
          />
          <OfferCard
            title="Self Onboarding "
            content="Just fill the Teacher registration form with certain verification and your name will be on our portal within 24hrs."
          />
          <OfferCard
            title="Valuable Analytics "
            content="On the basis of various parameters we will timely inform you with the changes that can help you make better connect with students, although it's completely up to you whether you want to consider or not."
          />
        </div>
      </section>

      {/* Impact section */}

      <ScrollTrigger
        onEnter={() => setCounterOn(true)}
        onExit={() => setCounterOn(false)}
      >
        <section className="impact" id="impact">
          <div className="title">
            <img src={Pattern} alt="pattern" />
            Our <span className="color-text">Impact</span>
            <p className="sub-title">
              Only for those who teach out of passion or as a service towards
              society & not only to make money out of it
            </p>
          </div>
          <div className="counter d-flex align-items-center justify-content-around">
            <div className="teacher text-center">
              <h5 className="title">Total Teacher</h5>
              <h4 className="count" data-val={totalTeachers}>
                {counterOn && (
                  <CountUp
                    start={0}
                    end={totalTeachers}
                    duration={2}
                    delay={0}
                  />
                )}
              </h4>
            </div>
            <div className="student text-center">
              <h5 className="title">Total Student</h5>
              <h4 className="count" data-val={totalStudents}>
                {counterOn && (
                  <CountUp
                    start={0}
                    end={totalStudents}
                    duration={2}
                    delay={0}
                  />
                )}
              </h4>
            </div>
            <div className="connected text-center">
              <h5 className="title">Total Connected</h5>
              <h4 className="count" data-val={totalConnected}>
                {counterOn && (
                  <CountUp
                    start={0}
                    end={totalConnected}
                    duration={2}
                    delay={0}
                  />
                )}
              </h4>
            </div>
          </div>
        </section>
      </ScrollTrigger>

      {/* blog section */}
      <section className="blog testimonial">
        <div className="title">
          <img src={Black} alt="pattern" />
          Blogs
        </div>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            340: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper mt-3"
        >
          {stateData?.blogs?.map((item) => {
            return (
              <SwiperSlide>
                <TestimonialCard
                  withoutImg={true}
                  head={item.name}
                  content={item.content}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>

      {/* testimonial section */}
      <section className="testimonial">
        <div className="title">
          <img src={Black} alt="pattern" />
          Testimonial
        </div>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            340: {
              slidesPerView: 1,
              spaceBetween: 20,
              pagination: {
                clickable: true,
              },
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper mt-3"
        >
          <SwiperSlide>
            <TestimonialCard
              withoutImg={true}
              head={"From Teacher"}
              content="Better Connect helped me to increase my batchsize from 5 to 9 students and I am very happy with that."
            />
          </SwiperSlide>
          <SwiperSlide>
            <TestimonialCard
              withoutImg={true}
              head={"From Parent"}
              content="I found the right teacher for my daughter, who has adjusted according to my daughter's learning curve and the teacher is very reliable."
            />
          </SwiperSlide>
          <SwiperSlide>
            <TestimonialCard
              withoutImg={true}
              head={"From Student"}
              content="I used to struggle to pass in Maths in my school exams, Better connects find the appropriate teacher; who helped me to score 71 in Maths in my Boards."
            />
          </SwiperSlide>
          <SwiperSlide>
            <TestimonialCard
              withoutImg={true}
              head={"From Parent"}
              content="We got transferred to new city & Better-Connect helped us to get aware of all the tuition options for my kids."
            />
          </SwiperSlide>
        </Swiper>
      </section>
    </>
  );
};

export default Home;
