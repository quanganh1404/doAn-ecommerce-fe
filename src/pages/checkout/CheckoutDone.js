import { Button, Result } from "antd";
import React from "react";
import LayoutAntd from "../../components/Layout";

function CheckoutDone() {
  return (
    <div>
      <LayoutAntd>
        <Result
          status="success"
          title="Chúc mừng bạn đơn  hàng của bạn đã đặt thành công"
          subTitle="Cảm ơn bạn đã dành sự ủng hộ cho VN Specialties. Chúc bạn có một ngày vui vẻ!"
          extra={[
            <Button
              onClick={() => {
                window.location.href = "/";
              }}
              type="primary"
              key="console"
            >
              Về trang chủ
            </Button>,
            <Button
              onClick={() => {
                window.location.href = "/";
              }}
              key="buy"
            >
              Tiếp tục mua hàng
            </Button>,
          ]}
        />
        ,
      </LayoutAntd>
    </div>
  );
}

export default CheckoutDone;
