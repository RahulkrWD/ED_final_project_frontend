import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import styles from "../Details/MenuList.module.css";
import { toast } from "react-toastify";
function MenuList({ heading }) {
  const [menu, setMenu] = React.useState("");

  const { search } = useLocation();
  const menuId = search.split("=")[1];
  const navigate = useNavigate();

  const [selectedItems, setSelectedItems] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState(0);

  async function fetchMenuData() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/restaurant/menu/${menuId}`
      );
      setMenu(response.data);
      sessionStorage.setItem("restaurant", heading.restaurant_name);
    } catch (err) {
      console.log("server error", err);
    }
  }

  function placeOrder(item) {
    const updatedItems = [...selectedItems, item];
    const updatedTotalPrice = calculateTotalPrice(updatedItems);
    setSelectedItems(updatedItems);
    setTotalPrice(updatedTotalPrice);
  }

  function removeOrder(item) {
    const itemIndex = selectedItems.indexOf(item);
    if (itemIndex !== -1) {
      const updatedItems = [...selectedItems];
      updatedItems.splice(itemIndex, 1);
      const updatedTotalPrice = calculateTotalPrice(updatedItems);
      setSelectedItems(updatedItems);
      setTotalPrice(updatedTotalPrice);
    }
  }

  function proceed() {
    if (!totalPrice > 0) {
      toast.error("Please add items");
    } else {
      sessionStorage.setItem("menu", JSON.stringify(selectedItems));
      sessionStorage.setItem("totalPrice", totalPrice);

      localStorage.getItem("authtoken")
        ? navigate(`/placeOrder`)
        : navigate("/login");
    }
  }

  function calculateTotalPrice(items) {
    return items.reduce((total, item) => {
      const menuItem = menu.find((menuItem) => menuItem.menu_name === item);
      return total + (menuItem ? parseFloat(menuItem.menu_price) : 0);
    }, 0);
  }
  React.useEffect(() => {
    fetchMenuData();
  });

  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <React.Fragment>
        <Button
          className="btn text-bg-danger fs-5"
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          Menu
        </Button>

        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          onClose={() => setOpen(false)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Sheet
            variant="outlined"
            sx={{
              maxWidth: 500,
              borderRadius: "md",
              p: 3,
              boxShadow: "lg",
            }}
          >
            <ModalClose variant="plain" sx={{ m: 1 }} />
            <div className="restaurant-name">
              <h3>{heading.restaurant_name}</h3>
            </div>
            <div className={styles.container}>
              {menu ? (
                <>
                  {menu.map((items) => (
                    <div className={styles.menuItems} key={items.menu_name}>
                      <div className={styles.list}>
                        <i
                          className={`fa-solid fa-seedling ${styles.pureVegIcons}`}
                        ></i>
                        <h6>{items.menu_name}</h6>
                        <p className="fw-bold">&#x20B9; {items.menu_price}</p>
                        <span className={styles.descriptions}>
                          {items.description}
                        </span>
                      </div>

                      <div className={styles.Image}>
                        <div>
                          <img
                            className={styles.menuImg}
                            src={items.menu_image}
                            alt=""
                          />
                        </div>
                        <div className={styles.addRemove}>
                          <button
                            onClick={() => {
                              placeOrder(items.menu_name);
                            }}
                            className="btn text-bg-success fw-bold"
                          >
                            +
                          </button>

                          <h6>
                            {
                              selectedItems.filter(
                                (item) => item === items.menu_name
                              ).length
                            }
                          </h6>

                          <button
                            onClick={() => {
                              removeOrder(items.menu_name);
                            }}
                            className="btn text-bg-warning fw-bold"
                          >
                            -
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                ""
              )}
            </div>

            <div className={styles.order}>
              <div className={styles.price}>
                <h4>Total: &#x20B9; {totalPrice.toFixed(2)}</h4>
              </div>

              <div className={styles.payBtn}>
                <button
                  onClick={proceed}
                  className="btn text-bg-danger p-2 fw-bold"
                >
                  Pay Now
                </button>
              </div>
            </div>
          </Sheet>
        </Modal>
      </React.Fragment>
    </div>
  );
}

export default MenuList;
