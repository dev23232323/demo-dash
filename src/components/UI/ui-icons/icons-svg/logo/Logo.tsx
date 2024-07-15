import React, { SVGProps } from "react";

interface LogoProps extends SVGProps<SVGSVGElement> {
  className?: string;
  height?: string;
  width?: string;
}

const Logo = ({ width = "100", height = "27", ...restProps }: LogoProps) => {
  return (
    <div>
      <svg
        width={width}
        height={height}
        viewBox="0 0 100 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...restProps}
      >
        <g clipPath="url(#clip0_23_5)">
          <path
            d="M0.26801 0.0992991C0.183778 0.145244 0.0918892 0.221818 0.0612595 0.267762C0.0306297 0.313707 0 2.95552 0 6.13336C0 11.2485 0.0153149 11.9377 0.122519 12.0908C0.23738 12.2516 0.283325 12.2593 1.53149 12.2593C2.60353 12.2593 2.84091 12.2363 2.94045 12.1368C3.04766 12.0372 3.06297 11.7309 3.06297 9.99271C3.06297 8.07069 3.07063 7.96349 3.21612 7.818C3.36161 7.6725 3.46882 7.66485 5.00796 7.66485C6.54711 7.66485 6.65431 7.65719 6.84575 7.50404L7.04484 7.35089V6.16399C7.04484 4.55593 7.19799 4.67845 5.09219 4.67845C3.43819 4.67845 3.43819 4.67845 3.25441 4.48701C3.0936 4.33386 3.06297 4.22666 3.06297 3.83613C3.06297 3.4456 3.0936 3.3384 3.25441 3.18525L3.43819 2.99381H5.88091C8.06328 2.99381 8.33895 2.9785 8.43084 2.86363C8.50741 2.7794 8.5457 2.44248 8.56101 1.70736C8.59164 0.436226 8.56101 0.21416 8.30066 0.0992991C8.03265 -0.0308773 0.490076 -0.0232199 0.26801 0.0992991Z"
            fill="white"
          />
          <path
            d="M9.97771 0.0763014C9.88582 0.122246 9.77861 0.221793 9.73267 0.306025C9.67141 0.405571 9.64844 2.28164 9.64844 6.20225C9.64844 11.8534 9.64844 11.953 9.80159 12.1061C9.93942 12.244 10.0543 12.2593 11.1646 12.2593C12.229 12.2593 12.3975 12.244 12.5047 12.1214C12.6042 12.0142 12.6272 11.7233 12.6502 10.3679C12.6808 8.39227 12.6731 8.41525 13.5078 8.44587L14.0515 8.46885L14.9704 10.2377C15.4757 11.2102 15.9352 12.0602 15.9965 12.1368C16.0807 12.244 16.2798 12.2593 17.3365 12.2593C18.5387 12.2593 18.5847 12.2516 18.7455 12.0832C18.8374 11.9836 18.9139 11.8075 18.9139 11.6926C18.9139 11.5625 18.5311 10.7584 17.9568 9.70169C17.4284 8.72154 16.9996 7.87157 16.9996 7.81797C16.9996 7.76436 17.1604 7.56527 17.3518 7.38149C18.0716 6.69232 18.4315 5.42119 18.3549 3.87439C18.2401 1.72265 17.4284 0.627637 15.6212 0.198821C15.1465 0.0839588 14.6181 0.0533291 12.5965 0.0303568C11.1799 0.0226993 10.0773 0.0380142 9.97771 0.0763014ZM14.8632 3.12396C15.2537 3.27711 15.3915 3.56809 15.3915 4.23429C15.3915 4.8622 15.2154 5.22209 14.8555 5.34461C14.71 5.39822 14.2352 5.4365 13.8141 5.4365C12.7267 5.44416 12.6808 5.40587 12.6502 4.37212C12.6195 3.52214 12.7038 3.17756 12.9718 3.07036C13.2704 2.94784 14.5186 2.98612 14.8632 3.12396Z"
            fill="white"
          />
          <path
            d="M20.3688 0.060942C20.0625 0.175803 20.0625 0.122201 20.0625 6.17923C20.0625 11.3863 20.0778 12.0296 20.185 12.1368C20.2922 12.244 20.7593 12.2593 24.2358 12.2593C27.7123 12.2593 28.1794 12.244 28.2866 12.1368C28.455 11.9683 28.4704 9.68634 28.3019 9.45662C28.1947 9.31878 28.0645 9.31112 25.7903 9.28815C22.9876 9.26518 23.1255 9.31112 23.1255 8.46115C23.1255 7.66478 23.1178 7.66478 24.9862 7.66478C26.265 7.66478 26.5637 7.6418 26.7092 7.54226C26.87 7.4274 26.8776 7.38145 26.8776 6.17923C26.8776 5.08422 26.8623 4.91576 26.7398 4.80855C26.6326 4.70901 26.3416 4.68603 24.9862 4.66306C23.7917 4.64775 23.3399 4.61712 23.2633 4.54054C23.2097 4.48694 23.1561 4.20362 23.1408 3.88966C23.0948 2.97843 22.9264 3.03969 25.7367 3.00906C27.8195 2.99374 28.1564 2.97077 28.2713 2.86356C28.3938 2.75636 28.4091 2.59555 28.4091 1.53883C28.4091 0.627592 28.3861 0.30598 28.3019 0.191118C28.1947 0.0532846 28.0569 0.0456272 24.3353 0.0303123C22.2142 0.0226548 20.4301 0.0379697 20.3688 0.060942Z"
            fill="white"
          />
          <path
            d="M29.9789 0.198849L29.7798 0.390285L29.8028 6.21759C29.8257 11.8841 29.8334 12.0449 29.9712 12.1521C30.1014 12.244 30.7829 12.2593 34.045 12.2593H37.9732L38.0881 12.0908C38.1876 11.953 38.2106 11.685 38.2106 10.7967C38.2106 9.80127 38.1953 9.64812 38.0651 9.49497L37.9196 9.3112L35.4999 9.27291C33.4554 9.24228 33.0648 9.21931 33.0036 9.11976C32.9653 9.0585 32.927 8.75986 32.927 8.46122C32.927 7.64187 32.881 7.66485 34.7877 7.66485C36.8246 7.66485 36.6791 7.77971 36.6791 6.18696C36.6791 4.55593 36.8323 4.67845 34.849 4.67845C32.8657 4.67845 32.9117 4.70142 32.9423 3.79784C32.9653 3.23885 32.9806 3.18525 33.1567 3.09336C33.2945 3.02444 33.9531 2.99381 35.653 2.99381C37.7052 2.99381 37.9732 2.9785 38.0651 2.86364C38.1417 2.7794 38.18 2.4195 38.1953 1.57719C38.2183 0.520462 38.2106 0.4056 38.0728 0.229479L37.9196 0.0457005L34.045 0.0227282L30.1703 -0.000244141L29.9789 0.198849Z"
            fill="white"
          />
          <path
            d="M22.0916 13.5764C21.8848 13.6147 21.4254 13.7831 21.0808 13.9439C20.384 14.2809 20.0241 14.6408 19.7178 15.2993C19.3119 16.1493 19.2966 16.3177 19.2966 21.1649C19.289 24.159 19.3196 25.7058 19.3732 25.8053C19.4804 26.0044 19.9092 26.0657 21.0425 26.035C21.6704 26.0121 21.992 25.9738 22.0763 25.8972C22.1835 25.813 22.2064 25.6368 22.2064 24.8405C22.2064 23.9292 22.26 23.6306 22.4668 23.5004C22.5127 23.4698 23.0028 23.4392 23.5542 23.4392C24.8559 23.4392 24.81 23.3932 24.81 24.6797C24.81 26.0503 24.764 26.0044 26.2879 26.0044C27.3446 26.0044 27.4901 25.9891 27.6356 25.8589C27.7964 25.7134 27.7964 25.6904 27.7964 21.341C27.7887 16.6164 27.7581 16.1799 27.3905 15.3682C26.977 14.4646 26.1194 13.8291 25.0244 13.607C24.3735 13.4692 22.7271 13.4539 22.0916 13.5764ZM24.3965 16.8767C24.7717 17.0682 24.81 17.2596 24.81 18.8064C24.81 20.5523 24.8865 20.4528 23.5235 20.4528C22.6276 20.4528 22.574 20.4451 22.3979 20.2613C22.2141 20.0852 22.2064 20.0469 22.2064 18.9442C22.2141 17.2443 22.3213 16.9227 22.9033 16.7695C23.2785 16.6776 24.1208 16.7312 24.3965 16.8767Z"
            fill="white"
          />
          <path
            d="M32.4292 13.5611C31.9467 13.6607 31.2346 13.944 30.8977 14.1814C30.2545 14.6178 29.8792 15.1386 29.5806 15.9809L29.3662 16.5858L29.3432 19.4956C29.3126 22.8343 29.3585 23.378 29.7491 24.205C30.3463 25.4455 31.3495 26.0887 32.9882 26.2725C35.0633 26.5022 36.8092 25.8054 37.552 24.4347C37.797 23.9905 38.0574 23.0104 38.0574 22.5509C38.0574 22.1068 37.9655 22.0609 36.6025 21.7622C35.5304 21.5249 35.4921 21.5249 35.316 21.655C35.1858 21.7546 35.0863 21.9537 34.9944 22.3212C34.8489 22.9185 34.6498 23.1482 34.1674 23.2784C33.639 23.4316 33.0264 23.3244 32.7125 23.0334C32.3526 22.6964 32.299 22.2676 32.3296 19.6718C32.3526 17.4205 32.3602 17.2597 32.5057 17.007C32.7431 16.6011 33.0954 16.4403 33.6926 16.4403C33.9989 16.448 34.2899 16.4939 34.4354 16.5705C34.8183 16.7696 34.9102 16.9534 35.1016 17.788C35.1322 17.9182 35.2394 18.0484 35.3696 18.1173C35.5764 18.2245 35.6759 18.2092 36.6561 17.9948C37.9578 17.7038 38.0574 17.6502 38.0574 17.2061C38.0574 16.716 37.7894 15.7435 37.5214 15.284C37.0543 14.4647 36.1124 13.8138 35.0863 13.5918C34.535 13.4769 32.9422 13.4616 32.4292 13.5611Z"
            fill="white"
          />
          <path
            d="M63.2199 13.607C61.7726 13.9592 60.8002 14.9394 60.4556 16.4096C60.2948 17.0988 60.2948 22.5432 60.4556 23.309C60.7772 24.8251 61.742 25.7976 63.2965 26.1652C64.0622 26.349 65.4865 26.326 66.2676 26.1269C67.7301 25.744 68.672 24.7332 68.963 23.24C69.1161 22.4054 69.1161 17.2749 68.9553 16.5092C68.626 14.9547 67.6076 13.9133 66.0991 13.5917C65.4406 13.4538 63.8172 13.4615 63.2199 13.607ZM65.5095 16.6087C65.632 16.6853 65.8005 16.8614 65.8923 17.0069C66.0378 17.2596 66.0455 17.3974 66.0455 19.8018C66.0455 21.1878 66.0225 22.4207 65.9919 22.5356C65.9536 22.6428 65.8464 22.8419 65.7392 22.972C65.3257 23.4544 64.1388 23.4698 63.687 22.995C63.3501 22.6428 63.3194 22.2982 63.3424 19.687C63.3654 17.0605 63.3884 16.9456 63.8248 16.6546C64.2537 16.3713 65.0577 16.356 65.5095 16.6087Z"
            fill="white"
          />
          <path
            d="M73.3815 13.607C71.9342 13.921 71.1302 14.7327 70.7779 16.2259C70.6554 16.7619 70.6401 17.2443 70.6401 21.2798V25.7517L70.8239 25.8972C70.977 26.0274 71.1302 26.0427 72.0873 26.0427C73.6188 26.0427 73.5423 26.104 73.5882 24.7486C73.6188 23.7837 73.6418 23.6459 73.772 23.5464C73.8868 23.4698 74.1855 23.4392 74.9283 23.4392C76.2377 23.4392 76.1917 23.3856 76.1917 24.718C76.1917 26.058 76.1305 26.0044 77.6849 26.0044C78.7263 26.0044 78.8718 25.9891 79.0173 25.8589C79.1781 25.7134 79.1781 25.6904 79.1781 21.4099C79.1781 16.7466 79.1398 16.1723 78.757 15.3453C78.3588 14.4723 77.4935 13.8367 76.3832 13.5994C75.7093 13.4615 74.0323 13.4615 73.3815 13.607ZM75.7782 16.8767C76.1381 17.0605 76.1917 17.3209 76.1917 18.8524C76.1917 20.5447 76.2683 20.4528 74.89 20.4528C74.3616 20.4528 73.8945 20.4221 73.8486 20.3915C73.6341 20.2537 73.5882 19.9627 73.5882 18.8294C73.5882 17.229 73.6954 16.9227 74.2927 16.7695C74.6679 16.6777 75.5102 16.7389 75.7782 16.8767Z"
            fill="white"
          />
          <path
            d="M0.122519 13.9591C0.0153149 14.1123 0 14.8014 0 19.9242C0 25.4376 0.00765742 25.7209 0.137834 25.8358C0.26801 25.9506 0.581965 25.9661 3.14721 25.9661C6.24847 25.9584 6.81512 25.9124 7.58086 25.5601C8.60696 25.1007 9.05109 24.2891 9.05109 22.88C9.05874 21.9228 8.85965 21.4099 8.293 20.8509C7.91779 20.4833 7.88716 20.422 7.9867 20.3148C8.39255 19.8553 8.72947 18.7528 8.72947 17.8875C8.72182 16.0497 8.14751 14.878 6.94529 14.2884C6.05703 13.8519 5.53632 13.7906 2.71839 13.7906C0.245038 13.7906 0.23738 13.7906 0.122519 13.9591ZM5.34489 16.8842C5.62821 17.0297 5.74308 17.3437 5.74308 17.9563C5.74308 18.5 5.56695 18.9135 5.28363 19.0513C5.16111 19.1126 4.76292 19.1508 4.21159 19.1508C2.96343 19.1508 2.9864 19.1663 2.9864 17.9794C2.9864 17.4662 3.01703 17.0069 3.04766 16.9532C3.17018 16.7541 3.49945 16.7005 4.30348 16.7311C4.82418 16.7541 5.1994 16.8077 5.34489 16.8842ZM5.46741 21.7544C5.75839 21.8616 5.9192 22.2368 5.88091 22.7269C5.81965 23.4237 5.72776 23.4697 4.37239 23.5003C2.95577 23.5309 2.9864 23.5539 2.9864 22.5967C2.9864 21.6625 2.97108 21.6778 4.24988 21.6778C4.81653 21.6778 5.3602 21.7084 5.46741 21.7544Z"
            fill="white"
          />
          <path
            d="M10.4292 13.8825C10.299 14.0127 10.299 25.7439 10.4292 25.8742C10.4981 25.9431 11.4553 25.9661 14.2503 25.9661C17.543 25.9661 17.9948 25.9506 18.102 25.8434C18.2015 25.7439 18.2245 25.5142 18.2245 24.5265C18.2245 23.8679 18.1862 23.2705 18.1479 23.2093C18.0867 23.1097 17.7114 23.0868 15.8047 23.0561L13.5381 23.0179L13.3926 22.8341C13.2548 22.6656 13.2472 22.4743 13.2472 18.3469C13.2472 14.5259 13.2318 14.0204 13.1246 13.9132C13.0251 13.8136 12.7877 13.7906 11.7616 13.7906C10.8963 13.7906 10.4905 13.8213 10.4292 13.8825Z"
            fill="white"
          />
          <path
            d="M39.4968 13.8749C39.3666 13.9438 39.3589 14.3113 39.3589 19.8094C39.3589 23.6994 39.3819 25.721 39.4355 25.8205C39.5121 25.9584 39.6116 25.9661 40.8062 25.9661C41.9548 25.9661 42.1079 25.9506 42.2152 25.8281C42.3224 25.7056 42.3453 25.4989 42.3453 24.534V23.3931L42.7665 22.8188C43.0039 22.5048 43.2259 22.2445 43.2642 22.2291C43.3025 22.2139 43.5629 22.5585 43.8462 22.995C44.1295 23.4314 44.6579 24.2277 45.0101 24.7791C45.37 25.3227 45.7146 25.8128 45.7835 25.8665C45.8678 25.9354 46.3578 25.9584 47.4835 25.9661C49.1528 25.9661 49.3059 25.9353 49.2217 25.6061C49.1987 25.5295 48.3181 24.1282 47.2537 22.4971C46.1894 20.8585 45.3088 19.4801 45.2858 19.4265C45.2705 19.3806 45.37 19.1816 45.5079 18.9978C45.929 18.4465 48.5785 14.7785 48.8082 14.4262C48.9843 14.1659 49.0073 14.0816 48.9307 13.9514C48.8541 13.7983 48.7929 13.7906 47.2767 13.7906C46.3961 13.7906 45.6457 13.8213 45.5615 13.8672C45.4849 13.9055 45.2628 14.1735 45.0561 14.4568C43.8309 16.1951 42.4755 17.9946 42.4142 17.9563C42.376 17.9333 42.3453 17.0451 42.3453 15.9807C42.3453 14.2041 42.3377 14.0357 42.2075 13.9208C42.085 13.8136 41.8782 13.7906 40.8445 13.7906C40.163 13.7906 39.5657 13.8289 39.4968 13.8749Z"
            fill="white"
          />
          <path
            d="M50.3554 13.9591C50.2482 14.1123 50.2329 14.8014 50.2329 19.9242C50.2329 25.4376 50.2406 25.7209 50.3707 25.8358C50.5009 25.9506 50.8149 25.9661 53.3418 25.9661C54.9269 25.9661 56.3818 25.9277 56.6575 25.8817C58.5183 25.5831 59.2917 24.6948 59.2917 22.8647C59.284 21.9228 59.0926 21.4022 58.5259 20.8509C58.1507 20.4833 58.1201 20.422 58.2196 20.3148C58.6101 19.863 58.9624 18.7067 58.9547 17.8491C58.9547 16.019 58.3345 14.8244 57.094 14.2424C56.2593 13.8519 55.7003 13.7906 52.9513 13.7906C50.4779 13.7906 50.4703 13.7906 50.3554 13.9591ZM55.5778 16.8842C55.8611 17.0297 55.976 17.3437 55.976 17.9563C55.976 18.5 55.7999 18.9135 55.5165 19.0513C55.394 19.1126 54.9882 19.1508 54.4139 19.1508C53.1887 19.1508 53.2193 19.1816 53.2193 17.9717C53.2193 17.4587 53.2499 17.0069 53.2806 16.9532C53.4031 16.7541 53.7324 16.7005 54.5364 16.7311C55.0571 16.7541 55.4323 16.8077 55.5778 16.8842ZM55.7003 21.7544C55.9913 21.8616 56.1521 22.2368 56.1138 22.7269C56.0526 23.4237 55.9607 23.4697 54.6053 23.5003C53.1887 23.5309 53.2193 23.5539 53.2193 22.5967C53.2193 21.6625 53.204 21.6778 54.4828 21.6778C55.0494 21.6778 55.5931 21.7084 55.7003 21.7544Z"
            fill="white"
          />
          <path
            d="M81.0154 13.9591C80.8623 14.1276 80.8623 14.1659 80.8776 19.9396C80.9006 25.5908 80.9082 25.7516 81.0461 25.8588C81.1609 25.943 81.4826 25.9661 82.3938 25.9661C83.4582 25.9661 83.6113 25.9506 83.7185 25.8281C83.8334 25.7056 83.8487 25.476 83.8487 24.2277C83.8487 22.7192 83.91 22.344 84.155 22.2138C84.3617 22.1066 85.1964 22.122 85.2883 22.2291C85.3342 22.2828 85.7554 23.0868 86.2302 24.0133C86.6973 24.9399 87.1414 25.7592 87.2027 25.8281C87.3022 25.9506 87.4707 25.9661 88.5504 25.9661C89.9823 25.9661 90.1278 25.92 90.1278 25.4529C90.1278 25.2462 89.9593 24.8633 89.5229 24.0594C88.4508 22.0683 88.2134 21.6165 88.2134 21.5323C88.2134 21.4864 88.3666 21.3102 88.5504 21.1418C89.2855 20.4603 89.6454 19.2198 89.5688 17.5811C89.4693 15.4064 88.6269 14.296 86.7738 13.9055C86.3374 13.8136 85.6635 13.7906 83.6955 13.7906C81.1916 13.7906 81.1763 13.7906 81.0154 13.9591ZM86.2148 16.8842C86.5135 17.0451 86.6283 17.4127 86.5901 18.1249C86.5671 18.6226 86.5365 18.7144 86.3527 18.8982C86.1459 19.1049 86.1153 19.1126 85.1658 19.1355C83.8793 19.1738 83.887 19.1739 83.887 17.964C83.887 16.7389 83.9406 16.6852 85.2424 16.7388C85.7095 16.7617 86.0694 16.8153 86.2148 16.8842Z"
            fill="white"
          />
          <path
            d="M91.4066 13.9286C91.2841 14.0588 91.2764 14.5795 91.2764 19.9014C91.2764 25.0932 91.2917 25.7364 91.3989 25.8436C91.5751 26.0274 96.4375 26.0274 97.3028 25.8436C98.0303 25.6981 98.6429 25.3918 99.0793 24.9553C99.4392 24.5954 99.5541 24.3964 99.7991 23.7531C99.9523 23.3473 99.9599 23.1559 99.9906 20.1541C100.014 17.474 99.9982 16.8921 99.891 16.4403C99.646 15.3376 99.1789 14.6791 98.3213 14.2503C97.5249 13.8521 96.9889 13.7908 94.125 13.7908C91.7052 13.7908 91.5214 13.7985 91.4066 13.9286ZM96.6136 16.8921C96.9889 17.1448 97.0195 17.3515 97.0195 19.8785C97.0195 22.4207 96.9889 22.6122 96.5983 22.8725C96.3839 23.0104 95.0668 23.1176 94.6993 23.0257C94.2552 22.9185 94.2628 22.9874 94.2628 19.8861C94.2628 16.8385 94.2628 16.8232 94.6457 16.7466C95.0592 16.67 96.4146 16.7696 96.6136 16.8921Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_23_5">
            <rect width="100" height="27" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
export default Logo;
