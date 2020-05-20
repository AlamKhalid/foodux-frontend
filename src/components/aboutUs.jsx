import React, { useEffect } from "react";
import LandingHeader from "./landingHeader";
import HeadingHome from "./common/headingHome";
import Footer from "./footer";

const AboutUs = ({ user }) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
  return (
    <div>
      <LandingHeader user={user} active={1} />
      <img
        src={require("../icons/about.png")}
        alt=""
        className="nav-menu-pic"
      />
      <div className="container mt-5 pt-5">
        <HeadingHome title="About Us" />
        <div className="row mb-4">
          <div className="col-12 col-md-6">
            <p className="text-justify mt-4 px-3 lead">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
          <div className="col-12 col-md-6">
            <p className="text-justify mt-4 px-3 lead">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </div>
        <hr class="w-header my-4 home-hr w-100" />
        <div class="z-depth-1 mt-3 mb-5 pb-5 px-4 px-lg-0">
          <section>
            <h2 class="font-weight-bold text-center dark-grey-text pb-2">
              OUR GOAL
            </h2>
            <hr class="w-header my-4 home-hr w-100" />
            <p class="lead text-center pt-2 mb-5 font-weight-normal">
              FooDux aims to discover the best cuisine in town with perfect
              taste, service and ambience from reputed cafes.
            </p>

            <div class="row">
              <div class="col-lg-8 mx-auto">
                <ol class="timeline">
                  <li class="timeline-element">
                    <h5 class="font-weight-bold dark-grey-text mb-3">
                      Restaurants
                    </h5>
                    <p class="grey-text font-small">
                      <time datetime="2018-03-26">Over 100+ Branded Cafes</time>
                    </p>
                    <p>
                      <img
                        class="img-fluid z-depth-1-half rounded"
                        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
                        alt=""
                      />
                    </p>
                    <p class="text-muted">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Assumenda ullam adipisci reiciendis porro natus laudantium
                      similique. Explicabo amet ipsum fugiat aliquam alias.
                    </p>
                  </li>

                  <li class="timeline-element">
                    <h5 class="font-weight-bold dark-grey-text mb-3">Foods</h5>
                    <p class="grey-text font-small">
                      <time datetime="2018-03-26">
                        Enjoy 1000+ scrumptious cuisines
                      </time>
                    </p>
                    <p>
                      <img
                        class="img-fluid z-depth-1-half rounded"
                        src="https://images.unsplash.com/photo-1576670636126-d1ac80f6e8f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=745&q=80"
                        alt="..."
                      />
                    </p>
                    <p class="text-muted">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Assumenda ullam adipisci reiciendis porro natus laudantium
                      similique. Explicabo amet ipsum fugiat aliquam alias.
                    </p>
                  </li>

                  <li class="timeline-element">
                    <h5 class="font-weight-bold dark-grey-text mb-3">Cities</h5>
                    <p>
                      <img
                        class="img-fluid z-depth-1-half rounded"
                        src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
                        alt="..."
                      />
                    </p>
                    <p class="grey-text font-small">
                      <time datetime="2018-03-26">
                        Explore in 10+ towns and cities
                      </time>
                    </p>
                    <p class="text-muted">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Assumenda ullam adipisci reiciendis porro natus laudantium
                      similique. Explicabo amet ipsum fugiat aliquam alias.
                    </p>
                  </li>

                  <li class="timeline-element">
                    <h5 class="font-weight-bold dark-grey-text mb-3">
                      Food Blog
                    </h5>
                    <p class="grey-text font-small">
                      <time datetime="2018-04-14">
                        10+ posts everyday to read
                      </time>
                      <p>
                        <img
                          class="img-fluid z-depth-1-half rounded"
                          src="https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"
                          alt="..."
                        />
                      </p>
                    </p>
                    <p class="text-muted">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Assumenda ullam adipisci reiciendis porro natus laudantium
                      similique. Explicabo amet ipsum fugiat aliquam alias.
                    </p>
                  </li>
                </ol>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
