import React from 'react';
import Svg, { Path } from 'svgs';

const Construction = ({ width, height }) => {
  return (
    <Svg
      height={height || 24}
      width={width || 24}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fill="none"
        stroke="#F9C802"
        strokeWidth={2}
        strokeMiterlimit={10}
        d="M19 17l-6 6"
      />
      <Path
        fill="#F9C802"
        d="M18 4v18.586l-4 4V4h-2v54l1.707 1.707L18 55.414V58h2V4h-2zm-4 26h2.586L14 32.586V30zm0 6h2.586L14 38.586V36zm0 6h2.586L14 44.586V42zm0 6h2.586L14 50.586V48zm0 8.586V54h2.586L14 56.586zM18 52h-2.586L18 49.414V52zm0-6h-2.586L18 43.414V46zm0-6h-2.586L18 37.414V40zm0-6h-2.586L18 31.414V34zm0-6h-2.586L18 25.414V28z"
      />
      <Path fill="#F59E01" d="M12 22h8v2h-8z" />
      <Path fill="#4E5E67" d="M10 58h12v4H10z" />
      <Path fill="#6E8189" d="M2 12h8v6H2z" />
      <Path fill="#99A8AE" d="M2 14h2v4H2zm4 0h2v4H6z" />
      <Path fill="#F9C802" d="M20 22h-6V12h8v8z" />
      <Path fill="#F59E01" d="M12 12h10v2H12z" />
      <Path fill="#018BC9" d="M16 14h4v4h-4z" />
      <Path fill="#F59E01" d="M48 12h4v2h-4z" />
      <Path
        fill="#F9C802"
        d="M56.414 4H20l-2-2h-4l-2 2H6.586L2 8.586V12h60V9.586L56.414 4zM6 10H3.414L6 7.414V10zm2 0V6h8.586l-4 4H8zm16 0h-8.586l4-4H24v4zm6 0h-4V6h4v4zm6 0h-4V6h4v4zm6 0h-4V6h4v4zm6 0h-4V6h4v4zm6 0h-4V6h4v4zm2 0V6.414L59.586 10H56z"
      />
      <Path
        fill="#6E8189"
        d="M51 32.184V30h-2v3a1 1 0 0 0 1 1 1 1 0 1 1-1 1 1 1 0 1 0-2 0c0 1.654 1.346 3 3 3s3-1.346 3-3a2.997 2.997 0 0 0-2-2.816z"
      />
      <Path fill="#F59E01" d="M52 28h-4l1 2h2z" />
      <Path fill="#F9C802" d="M52 28h-4l1-2h2z" />
      <Path fill="#6E8189" d="M49 14h2v12h-2z" />
      <Path
        fill="#4E5E67"
        d="M51 22l-2 2v2l2-2zm0-4l-2 2v2l2-2zm0-4l-2 2v2l2-2zm3 26h2v4h-2zm-10 0h2v4h-2z"
      />
      <Path
        fill="#6E8189"
        d="M62 46v-2h-2v-6h-2v6H42v-6h-2v6h-2v2h2v6h-2v2h2v8h20v-8h2v-2h-2v-6h2zm-4 14H42v-5h16v5zm-16-8v-5h16v5H42z"
      />
      <Path
        fill="#4E5E67"
        d="M40 54v2h4v4h2v-4h8v4h2v-4h4v-2zm0-8v2h4v4h2v-4h8v4h2v-4h4v-2z"
      />
      <Path fill="#F59E01" d="M58 8h4v4h-4z" />
    </Svg>
  );
};

export default Construction;
