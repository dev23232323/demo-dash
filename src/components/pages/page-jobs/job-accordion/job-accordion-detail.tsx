"use client";
import { Jobs } from "@/@types/backend/job.type";
import Button from "@/components/UI/ui-button";
import { ExternalLink } from "@/components/UI/ui-icons";
import TextField from "@/components/UI/ui-text-field";
import { StyledHeading, Typography } from "@/styled-components/styled-global";
import {
  StyledAccordionJobDetailsWrapper,
  StyledJobActionButtonWrapper,
  StyledJobDetailInputWrapper,
} from "@/styled-components/styled-pages/styled-job/styled-job-accordion";
import { theme } from "@/styled-components/styled-theme";
import axiosInstance from "@/utils/utils";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";
import Swal from "sweetalert2";

interface JobAccordionDetailProps {
  data: Jobs;
}

const JobAccordionDetail: FC<JobAccordionDetailProps> = ({ data }) => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);

  async function deleteJobRequest() {
    axiosInstance
      .get(`/jobs/delete?id=${data.other.id}`)
      .then((e) => {
        console.log(e);
        params.set("refresh", "1");
        replace(`${pathname}?${params.toString()}`);
        Swal.fire("Deleted!", "Job Deleted Successfully", "success");
      })
      .catch((e) => {
        Swal.fire({
          title: "Error!",
          html:
            "There was an error deleting it <br/>" + e.response.data.message ||
            e.message,
          icon: "error",
        });
      });
  }

  function confirmDelete() {
    Swal.fire({
      title: "Are you sure?",
      html: `You want to delete job for <i><strong style="color: black;">${data.job.email}</strong></i>
`,
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: theme.colors.danger,
      icon: "error",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteJobRequest();
      }
    });
  }

  return (
    <StyledAccordionJobDetailsWrapper>
      <StyledHeading>Candidate info</StyledHeading>
      <StyledJobDetailInputWrapper>
        {Object.entries(data.job).map(([key, value]) => (
          <TextField
            key={`${key}-${value}`}
            value={value}
            label={key}
            disabled
            aria-disabled
            styles={{
              label: {
                color: "#fff",
              },
            }}
          />
        ))}
      </StyledJobDetailInputWrapper>
      <div style={{ wordBreak: "break-word", textAlign: "justify" }}>
        <Typography $isBold>Message:</Typography>
        <Typography>{data.other.message}</Typography>
      </div>

      <StyledJobActionButtonWrapper>
        {/* <Link href={data.other.fileUrl} download={data.other.fileName}>
          <Button icon={Download} iconAlign="end" title="Download Resume">
            Resume
          </Button>
        </Link> */}

        <Link href={data.other.fileUrl} target="_blank">
          <Button
            icon={ExternalLink}
            iconAlign="end"
            title={`View Resume ${data.other.fileName}`}
          >
            Resume
          </Button>
        </Link>
        <Button
          style={{ backgroundColor: theme.colors.danger }}
          title="Delete "
          onClick={confirmDelete}
        >
          Delete
        </Button>
      </StyledJobActionButtonWrapper>
    </StyledAccordionJobDetailsWrapper>
  );
};
export default JobAccordionDetail;
