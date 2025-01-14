import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Tag,
  Layout,
  Menu,
  Button,
  Drawer,
  Row,
  Col,
  ConfigProvider,
  Flex,
  Dropdown,
  Badge,
} from "antd";
import type { MenuProps } from "antd";
import {
  MenuOutlined,
  SmileTwoTone,
  EditTwoTone,
  CopyTwoTone,
  BellOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { postLogout } from "../../api/members";
import {
  getNotifications,
  patchNotification,
  delNotification,
} from "../../api/notification";
import { NoticationAlert } from "../../types/DataTypes";
import { RootState, AppDispatch } from "../../redux/store/store";
import {
  resetAuth,
  updateAlertCount,
} from "../../redux/reducers/user/userSlice";
import logo from "/NavLogo.png";
import MypageMenu from "./MypageMenu";
import style from "../../styles/common/Navbar.module.css";

const { Header } = Layout;
const items: MenuProps["items"] = [
  { key: "1", label: <Link to="/search">판례/법령</Link> },
  { key: "2", label: <Link to="/recommend">맞춤형판례</Link> },
  { key: "3", label: <Link to="/cal">비용계산</Link> },
  { key: "4", label: <Link to="/plaint">소장작성</Link> },
  { key: "5", label: <Link to="/board/list">상담소</Link> },
  { key: "6", label: <Link to="/news">뉴스</Link> },
];

interface ResponsiveNavProps {
  selectedKeys: string[];
  selectedSubKeys: string[];
  setSelectedKeys: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedSubKeys: React.Dispatch<React.SetStateAction<string[]>>;
}

const ResponsiveNav = ({
  selectedKeys,
  selectedSubKeys,
  setSelectedKeys,
  setSelectedSubKeys,
}: ResponsiveNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [visible, setVisible] = useState(false);
  const [alertList, setAlertList] = useState<NoticationAlert[]>([]);
  const [alertCount, setAlertCount] = useState(0);
  const [handleUpdate, setHandleUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getNotifications(user.userId);
        // const response = await getNotifications(28);
        const filteredAlerts = response.filter(
          (item: NoticationAlert) => item.state === 0
        );
        const topFourAlerts = filteredAlerts.slice(0, 3);
        setAlertList(topFourAlerts);
        setAlertCount(filteredAlerts.length);
        dispatch(updateAlertCount(filteredAlerts.length));
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchData();
  }, [user.memberId, handleUpdate, location]);

  const alertItems = alertList.map((item, index) => (
    <Menu.Item
      key={index}
      style={{
        // width: "200px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {item.title}

      <Button
        onClick={() => handleApply(item.notificationId)}
        style={{ marginLeft: "1.5rem" }}
        shape="round"
      >
        읽음
      </Button>
      <Button
        onClick={() => handleDeny(item.notificationId)}
        shape="round"
        type="primary"
      >
        삭제
      </Button>
    </Menu.Item>
  ));

  alertItems.push(
    <Menu.Item key="more">
      <Link to="/notifications">알람 전체 보기</Link>
    </Menu.Item>
  );

  const handleApply = (notificationId: number): void => {
    patchNotification(notificationId)
      .then(() => {
        setHandleUpdate(!handleUpdate);
        setAlertCount(alertCount - 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeny = (notificationId: number) => {
    delNotification(notificationId)
      .then(() => {
        setHandleUpdate(!handleUpdate);
        setAlertCount(alertCount - 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handlelogout = () => {
    postLogout(user.accessToken, user.refreshToken)
      .then(() => {
        dispatch(resetAuth());
        navigate("/");
      })
      .catch(() => {
        alert("다시 로그아웃해주세요");
      });
  };

  return (
    // 컬러 지정
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#BF8438",
          borderRadius: 2,
        },
        components: {
          Layout: {
            headerBg: "#ffffff",
          },
        },
      }}
    >
      {/* 웹사이즈 네브바 위치 수정해야함 */}
      {/* <Layout> */}
      <Header style={{ padding: 0, height: "auto" }}>
        <Row justify="space-between" align="middle">
          <Col
            xs={10}
            sm={20}
            md={4}
            style={{
              marginLeft: "2rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={logo}
              alt="로고"
              style={{ width: "100px", height: "auto", cursor: "pointer" }}
              onClick={() => {
                navigate("/");
              }}
            />
          </Col>

          <Row className={style["contents"]}>
            <Col xs={0} sm={0} md={16} lg={18}>
              <Menu
                mode="horizontal"
                selectedKeys={selectedKeys}
                items={items}
                overflowedIndicator={<MoreOutlined />}
              />
            </Col>

            <Row className={style["contents2"]}>
              <Col xs={0} sm={0} md={15}>
                <Row justify="space-around" align="middle">
                  {user.accessToken != "" && (
                    <>
                      <Badge
                        count={alertCount}
                        overflowCount={999}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: ".5rem .3rem .3rem .3rem",
                        }}
                        className={style["move-badge"]}
                        size="small"
                      >
                        <Dropdown
                          overlay={<Menu>{alertItems}</Menu>}
                          placement="bottomRight"
                          trigger={["hover"]}
                        >
                          <BellOutlined
                            style={{
                              fontSize: "1rem",
                              cursor: "pointer",
                            }}
                          />
                        </Dropdown>
                      </Badge>
                      <MypageMenu
                        username={user.nickname}
                        mode={"horizontal"}
                        setSelectedKeys={setSelectedKeys}
                        selectedSubKeys={selectedSubKeys}
                        setSelectedSubKeys={setSelectedSubKeys}
                      />
                    </>
                  )}
                </Row>
              </Col>

              <Col xs={0} sm={0} md={8}>
                {user.accessToken === "" ? (
                  <Button
                    type="primary"
                    shape="round"
                    style={{ marginRight: "10px" }}
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    로그인
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    shape="round"
                    style={{ marginRight: "10px" }}
                    onClick={handlelogout}
                  >
                    로그아웃
                  </Button>
                )}
              </Col>
            </Row>
          </Row>
          {/* 핸드폰 사이즈 네브바 */}
          <Col
            xs={2}
            sm={2}
            md={0}
            style={{ paddingRight: "30px", marginRight: "15px" }}
          >
            <Button type="primary" onClick={showDrawer}>
              <MenuOutlined />
            </Button>
          </Col>
        </Row>

        <Drawer
          title="전체 메뉴"
          placement="right"
          onClick={onClose}
          onClose={onClose}
          open={visible}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "8rem",
              backgroundColor: "#fffbf0",
              color: "644419",
            }}
          >
            {user.accessToken === "" ? (
              <Flex vertical gap={15}>
                로그인이 필요합니다
                <Button
                  type="primary"
                  shape="round"
                  style={{ marginRight: "10px" }}
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  로그인
                </Button>
              </Flex>
            ) : (
              <Flex vertical gap={15}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    fontWeight: "bold",
                  }}
                >
                  {user.nickname}님! 안녕하세요
                  <Button
                    onClick={() => {
                      navigate("/notifications");
                    }}
                    style={{ marginLeft: "20px" }}
                  >
                    <Badge
                      count={alertCount}
                      overflowCount={999}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        zIndex: 1,
                        padding: ".5rem .3rem .3rem .3rem",
                        fontSize: ".6rem",
                      }}
                      className={style["move-badge"]}
                      size="small"
                    >
                      <BellOutlined />
                    </Badge>
                  </Button>
                </div>
                <Button
                  type="primary"
                  shape="round"
                  style={{ marginRight: "10px" }}
                  onClick={handlelogout}
                >
                  로그아웃
                </Button>
              </Flex>
            )}
          </div>

          {user.accessToken != "" && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/mypage/user");
                }}
              >
                <SmileTwoTone
                  style={{ fontSize: "3rem" }}
                  twoToneColor="#BF8438"
                />
                <Tag bordered={false}>회원정보</Tag>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/mypage/papers");
                }}
              >
                <EditTwoTone
                  style={{ fontSize: "3rem" }}
                  twoToneColor="#BF8438"
                />
                <Tag bordered={false}>내가쓴소장</Tag>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/mypage/case");
                }}
              >
                <CopyTwoTone
                  style={{ fontSize: "3rem" }}
                  twoToneColor="#BF8438"
                />
                <Tag bordered={false}>저장한판례</Tag>
              </div>
            </div>
          )}

          <Menu
            mode="vertical"
            items={items}
            defaultSelectedKeys={["1"]}
          ></Menu>
        </Drawer>
      </Header>
      {/* </Layout> */}
    </ConfigProvider>
  );
};

export default ResponsiveNav;
