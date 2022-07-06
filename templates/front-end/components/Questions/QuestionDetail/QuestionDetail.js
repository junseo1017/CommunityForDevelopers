import React from "react";
import { Row, Col, Input, Button, Divider } from "antd";
import TopButton from "../TopButton";

const QuestionDetail = ({ questId }) => {
  return (
    <>
      <Row justify="center" align="middle">
        <Col>
          <h1>Question Title({questId})</h1>
        </Col>
      </Row>
      <Row justify="end">
        <Col>
          <a href="/">
            <Button size="large" type="primary">
              질문하기
            </Button>
          </a>
        </Col>
      </Row>
      <Divider plain />
      <Row justify="center" align="middle">
        <Col span={16}>
          <h2>"Question Description"</h2>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis impedit, illum tenetur
          placeat excepturi tempore qui corrupti eaque deleniti quae libero similique. Harum numquam
          assumenda eaque? Culpa quibusdam veritatis a. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Quo molestiae quod quos consequuntur? Odio soluta, fugiat sint facilis
          aperiam, illum nisi reprehenderit, nemo aliquam quibusdam eum ipsa accusamus voluptates
          accusantium. Sunt numquam repudiandae esse fugit, quisquam dolorum voluptate libero eaque
          optio officia est, nemo molestias aliquid! Tempore deserunt ipsum maiores laborum magni
          odit incidunt deleniti! Officia repudiandae facilis corrupti itaque! Consequatur placeat
          unde distinctio officia ducimus dignissimos odit exercitationem. Saepe eius aspernatur
          consequuntur nostrum. Maxime corporis ipsam voluptates debitis aspernatur, praesentium
          architecto expedita sed itaque unde corrupti dignissimos voluptatibus nostrum! Laboriosam
          amet fugit sint quos quasi. Voluptatum quos optio blanditiis sequi, nostrum culpa
          voluptatem consectetur. Doloribus illum fuga provident similique dicta autem in. Rerum
          placeat esse nemo odio cum repellat. Nesciunt eius officia numquam quidem a sit ipsum
          explicabo doloribus saepe sint accusamus enim similique id, voluptas pariatur soluta eum
          doloremque laudantium dicta esse quae? Ratione impedit minima tempore nam. Nisi
          consequuntur commodi quae alias delectus ipsum sit molestias quaerat ea molestiae. Facilis
          vel libero ab blanditiis nam natus quo recusandae soluta veritatis laboriosam! Quod
          pariatur ipsum at fugiat minima? Ratione mollitia veritatis nobis a sequi quam? Nobis
          repellendus numquam perspiciatis id placeat sequi commodi tempora repudiandae. Explicabo
          enim consectetur voluptate nobis deserunt sit. Voluptates esse doloremque repellat iusto
          animi? Accusamus tenetur ratione expedita eaque, pariatur numquam nobis cupiditate
          assumenda voluptates dolorem illum amet quae omnis adipisci officia dolor perferendis sed?
          Libero ipsam cum dolorum, ea nisi enim quas corrupti! Pariatur excepturi quod facilis
          molestias dolorum adipisci veritatis voluptate iusto vero ut fuga, quo explicabo molestiae
          consequuntur commodi cupiditate laudantium asperiores quaerat at. Obcaecati quam veniam,
          tempora dicta neque sed. Magni commodi dolorum non temporibus officiis molestiae, fugiat
          rerum a quos culpa nobis cupiditate recusandae atque at voluptatum? Assumenda possimus ut
          earum voluptatem voluptas, mollitia sapiente veritatis inventore odit obcaecati.
        </Col>
      </Row>
      <Divider plain />
      <Row justify="center" align="middle">
        <Col span={16}>
          <h2>"Answer 1"</h2>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis impedit, illum tenetur
          placeat excepturi tempore qui corrupti eaque deleniti quae libero similique. Harum numquam
          assumenda eaque? Culpa quibusdam veritatis a. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Quo molestiae quod quos consequuntur? Odio soluta, fugiat sint facilis
          aperiam, illum nisi reprehenderit, nemo aliquam quibusdam eum ipsa accusamus voluptates
          accusantium. Sunt numquam repudiandae esse fugit, quisquam dolorum voluptate libero eaque
          optio officia est, nemo molestias aliquid! Tempore deserunt ipsum maiores laborum magni
          odit incidunt deleniti! Officia repudiandae facilis corrupti itaque! Consequatur placeat
          unde distinctio officia ducimus dignissimos odit exercitationem. Saepe eius aspernatur
          consequuntur nostrum. Maxime corporis ipsam voluptates debitis aspernatur, praesentium
          architecto expedita sed itaque unde corrupti dignissimos voluptatibus nostrum! Laboriosam
          amet fugit sint quos quasi. Voluptatum quos optio blanditiis sequi, nostrum culpa
          voluptatem consectetur. Doloribus illum fuga provident similique dicta autem in.
        </Col>
      </Row>
      <Divider plain />
      <Row justify="center" align="middle">
        <Col span={16}>
          <h2>"Answer 2"</h2>
          Rerum placeat esse nemo odio cum repellat. Nesciunt eius officia numquam quidem a sit
          ipsum explicabo doloribus saepe sint accusamus enim similique id, voluptas pariatur soluta
          eum doloremque laudantium dicta esse quae? Ratione impedit minima tempore nam. Nisi
          consequuntur commodi quae alias delectus ipsum sit molestias quaerat ea molestiae. Facilis
          vel libero ab blanditiis nam natus quo recusandae soluta veritatis laboriosam! Quod
          pariatur ipsum at fugiat minima? Ratione mollitia veritatis nobis a sequi quam? Nobis
          repellendus numquam perspiciatis id placeat sequi commodi tempora repudiandae. Explicabo
          enim consectetur voluptate nobis deserunt sit. Voluptates esse doloremque repellat iusto
          animi? Accusamus tenetur ratione expedita eaque, pariatur numquam nobis cupiditate
          assumenda voluptates dolorem illum amet quae omnis adipisci officia dolor perferendis sed?
          Libero ipsam cum dolorum, ea nisi enim quas corrupti! Pariatur excepturi quod facilis
          molestias dolorum adipisci veritatis voluptate iusto vero ut fuga, quo explicabo molestiae
          consequuntur commodi cupiditate laudantium asperiores quaerat at. Obcaecati quam veniam,
          tempora dicta neque sed. Magni commodi dolorum non temporibus officiis molestiae, fugiat
          rerum a quos culpa nobis cupiditate recusandae atque at voluptatum? Assumenda possimus ut
          earum voluptatem voluptas, mollitia sapiente veritatis inventore odit obcaecati.
        </Col>
      </Row>
      <Divider plain />

      <TopButton />
    </>
  );
};

export default QuestionDetail;
