import { Search } from "@mui/icons-material";
import { Button, Input } from "@mui/joy";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [jobs, setJobs] = useState([]); // State to store the fetched job data

  const handleSearch = async () => {
    console.log("Search button clicked");
    try {
      const response = await fetch(`http://localhost:5000/?search=${keyword}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data); // Add this line
        setJobs(data);
      } else {
        console.error("Error fetching data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleJobClick = (job) => {
    // Set the job detail in location state and navigate to job details page
    navigate(`/job/${job.id}`, { state: { jobDetail: job } });
  };

  return (
    <div className="">
      <section
        className="hero-area overflow-hidden bg-light "
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80)",
          opacity: "0.9",
          height:"400px"
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="hero-content text-center py-lg-5">
                <h1 className="section-title fs-1 fw-bold shadow-lg rounded-3  text-black" style={{marginTop:"100px"}}>
                  Start Your Job Search Today
                </h1>

                <div className="mt-3 d-flex justify-content-center mt-5">
                  <div
                    className="input-group bg-white p-2 rounded-pill shadow"
                    style={{ maxWidth: 800 , marginTop:"0px" }}
                  >
                    <Input
                      type="text"
                      className="form-control border-0 shadow-0"
                      placeholder="Write Your Job Name"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      sx={{ boxShadow: "none" }}
                      color="white"
                    />
                    <Button
                      type="button"
                      // style={{ backgroundColor: "rgb(251 109 255)" }}
                      className="d-flex align-item-center justify-content-center ms-2 text-capitalize bg-info btn text-dark rounded-pill px-3"
                      onClick={handleSearch}
                    >
                      <div className="fs-5">Search</div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="row p-3">
        {jobs.results &&
          jobs.results.map((job) => (
            <div key={job.id} className="col-md-6 mb-3">
              <div
                className="card rounded-4 "
                style={{ backgroundColor: "rgb(240 227 241)" }}
              >
                <div className="card-body">
                  <h5 className="card-title">{job.title}</h5>

                  {job.description.length <= 100 ? (
                    <p className="card-text mb-3">{job.description}</p>
                  ) : (
                    <div>
                      <p className="card-text ">
                        {job.description.slice(0, 100)}...
                        {/* <button>Show More</button> */}
                      </p>
                    </div>
                  )}
                  <div className="row mt-2" style={{ marginBottom: "-15px" }}>
                    <p className="card-text d-flex col">
                      Salary:&nbsp;<p className="fw-bold">{job.salary_min}</p>{" "}
                    </p>
                    <p className="d-flex col">
                      Company: &nbsp;{" "}
                      <p className="fw-bold">{job.company.display_name}</p>
                    </p>{" "}
                  </div>
                  <div
                    className="d-flex align-items-center justify-content-between"
                    style={{ marginBottom: "-18px" }}
                  >
                    <p className=" d-flex  ">
                      <p>Location:</p> &nbsp;{" "}
                      <p className="fw-bold "> {job.location.display_name}</p>
                    </p>

                    <Button
                      variant="outlined"
                      onClick={() => handleJobClick(job)}
                    >
                      View Details
                    </Button>
                  </div>
                  {/* <a
                    href={job.redirect_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  ></a> */}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
