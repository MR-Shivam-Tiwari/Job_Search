import { Button, Link } from '@mui/joy'
import React from 'react'
import { useNavigate } from 'react-router-dom';

function JobCard({ job }) {
    const navigate = useNavigate();

    const handleViewDetails = () => {
      navigate(`/job/${job.id}`, { state: { job } });
    };
  return (
    <div>
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
                    <Link to={`/job/${job.id}`}>
                      <Button variant="outlined" onClick={handleViewDetails}>View Details</Button>
                    </Link>
                  </div>
                  {/* <a
                    href={job.redirect_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  ></a> */}
                </div>
              </div>
            </div>
    </div>
  )
}

export default JobCard
