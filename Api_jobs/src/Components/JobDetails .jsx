import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Add from "@mui/icons-material/Add";
import { Button, Chip, Divider, Stack, Textarea, Typography } from "@mui/joy";
import { FlashOnTwoTone, LocationOnTwoTone } from "@mui/icons-material";
import QuickApplyForm from "./QuickApplyForm";
import { useHistory } from "react-router";
function JobDetails() {
  const location = useLocation();
  const { jobDetail } = location.state || {};
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    coverLetter: "",
    resume: "",
  });

  //...

  // Update the state when form inputs change
  const handleNameChange = (e) => {
    setFormData({
      ...formData,
      name: e.target.value,
    });
  };

  const handleEmailChange = (e) => {
    setFormData({
      ...formData,
      email: e.target.value,
    });
  };

  const handleCoverLetterChange = (e) => {
    setFormData({
      ...formData,
      coverLetter: e.target.value,
    });
  };

  const handleResumeChange = (e) => {
    // Store the selected resume file in state
    setFormData({
      ...formData,
      resume: e.target.files[0] ? e.target.files[0].name : "",
    });
  };

  //...

  const handleSendData = () => {
    // Use navigate to go to another page and pass data as state
    navigate('/success', { state: { formData } });
  };
  


  // const handleResumeChange = (e) => {
  //   // Store the selected resume file in state
  //   setResume(e.target.files[0]);
  // };

  return (
    <div>
      <div className="p-3 container">
        <div
          className=" card p-3 "
          style={{ backgroundColor: "rgb(240 227 241)" }}
        >
          {/* {data.map(job => ( */}
          <div key={""}>
            <div className="job-details mb-1 d-flex">
              <h5 className=" fw-bold">Job Details</h5> &nbsp;&nbsp;
            </div>
            <Divider className="my-1" />
            <div>
              <div className="jd-about mb-4 mt-3">
                <h6 className="mb-2">Job Name:</h6>
                <p>{jobDetail?.title}</p>
              </div>
            </div>
            <div>
              <div className="jd-about mb-4 mt-3">
                <h6 className="mb-2">Company Name:</h6>
                {jobDetail?.company?.display_name}
              </div>
            </div>
            <div className="job-description mb-4">
              <h5 className="mb-3  fw-bold">Full Job Description</h5>
              {jobDetail?.description}

              <div className="job-type mb-4 mt-3 ">
                <h6 className="mb-2 d-flex">
                  Job Location: &nbsp;
                  <Typography
                    startDecorator={<LocationOnTwoTone color="primary" />}
                  >
                    {jobDetail?.location && jobDetail?.location?.display_name}
                  </Typography>
                </h6>
              </div>
              <div className="salary mb-4 d-flex align-items-center justify-content-between">
                <h6 className="mb-2">
                  Salary:{" "}
                  <span>
                    {jobDetail?.salary_min}&nbsp;To&nbsp;{jobDetail?.salary_max}
                  </span>
                </h6>
                <div>
                  <Button
                    variant="soft"
                    startDecorator={<FlashOnTwoTone />}
                    style={{ marginTop: "-50px" }}
                    onClick={() => setOpen(true)}
                  >
                    Quick Apply
                  </Button>
                  <Modal open={open} onClose={() => setOpen(false)}>
                    <ModalDialog>
                      <DialogTitle>Apply Job</DialogTitle>
                      <form
                        onSubmit={(event) => {
                          event.preventDefault();
                          setOpen(false);
                        }}
                      >
                        <Stack spacing={2} width={500}>
                          <form >
                            <FormControl>
                              <FormLabel>Name</FormLabel>
                              <Input  onChange={handleNameChange} value={formData.name}type="text" autoFocus required />
                            </FormControl>
                            <FormControl>
                              <FormLabel>Email</FormLabel>
                              <Input onChange={handleEmailChange} value={formData.email} type="email" required />
                            </FormControl>
                            <FormControl>
                              <FormLabel>Cover Letter Note</FormLabel>
                              <Textarea onChange={handleCoverLetterChange} value={formData.coverLetter} minRows={3} />
                            </FormControl>
                            <FormControl className="mb-3">
                              <label>
                                <FormLabel>Resume</FormLabel>
                                &nbsp;
                                <input
                                  type="file"
                                  accept=".pdf,.doc,.docx"
                                  onChange={handleResumeChange}
                                  required
                                />
                              </label>
                            </FormControl>
                            <Button variant="soft" fullWidth onClick={handleSendData} type="submit">Submit</Button>
                          </form>
                        </Stack>
                      </form>
                    </ModalDialog>
                  </Modal>
                </div>
              </div>
            </div>

            <Divider className="my-3" />
          </div>
          {/* ))} */}
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
