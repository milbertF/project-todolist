import './App.css';
import Empty from './assets/images/empty.svg';
import { Helmet } from "react-helmet";
import { useState, useRef, useEffect } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    task: "",
    time: "",
    priority: "High",
    category: "Personal"
  });
  const dialogRef = useRef(null);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Helper function to get class based on priority
  const getPriorityClass = (priority) => {
    if (priority === "High") return "high";
    if (priority === "Medium") return "medium";
    if (priority === "Low") return "low";
    return "";
  };

  const openModal = () => {
    setIsOpen(true);
    dialogRef.current.showModal();
  };

  const closeModal = () => {
    setIsOpen(false);
    dialogRef.current.close();
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    let key = "";
    switch (id) {
      case "inputTask":
        key = "task";
        break;
      case "inputTime":
        key = "time";
        break;
      case "selectPriority":
        key = "priority";
        break;
      case "selectCategory":
        key = "category";
        break;
      default:
        key = id;
        break;
    }
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    const newTask = { ...formData, id: Date.now() };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setFormData({
      task: "",
      time: "",
      priority: "High",
      category: "Personal"
    });
    closeModal();
  };

  return (
    <>
      <Helmet>
        <title>Todo List</title>
        <meta name="description" content="Stay organized and boost productivity with our smart to-do list. Easily categorize tasks, set priorities, and track progress for work, personal goals, and daily routines—all in one place." />
      </Helmet>

      {isOpen && (
        <dialog ref={dialogRef} id="dialogs" onClick={(e) => e.target === dialogRef.current && closeModal()}>
          <div className="modalCon">
            <span id="spanModal" onClick={closeModal} style={{ cursor: "pointer" }}>X</span>
            <h2>Add Task</h2>
            <form onSubmit={handleAddTask}>
              <div className="part">
                <label htmlFor="inputTask">Task</label>
                <div className="inputPart">
                  <input
                    type="text"
                    id="inputTask"
                    required
                    value={formData.task}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="part">
                <label htmlFor="inputTime">Time</label>
                <div className="inputPart">
                  <input
                    type="datetime-local"
                    id="inputTime"
                    required
                    value={formData.time}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="partWrap">
                <div className="part">
                  <label htmlFor="selectPriority">Priority</label>
                  <div className="inputPart">
                    <select
                      id="selectPriority"
                      required
                      value={formData.priority}
                      onChange={handleInputChange}
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>
                <div className="part">
                  <label htmlFor="selectCategory">Category</label>
                  <div className="inputPart">
                    <select
                      id="selectCategory"
                      required
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      <option value="Personal">Personal</option>
                      <option value="Work">Work</option>
                      <option value="School">School</option>
                      <option value="Health & Fitness">Health & Fitness</option>
                      <option value="Finance">Finance</option>
                      <option value="Shopping">Shopping</option>
                      <option value="Home & Chores">Home & Chores</option>
                      <option value="Social & Events">Social & Events</option>
                    </select>
                  </div>
                </div>
              </div>
              <button type="submit">Add</button>
            </form>
          </div>
        </dialog>
      )}

      <div className="whole">
        <div className="container">
          <div className="title">
            <svg width="962" height="133" viewBox="0 0 962 133" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M34.4 131V33.6H0V2.19999H112V33.6H77.4V131H34.4ZM181.361 133C166.961 133 154.761 130.8 144.761 126.4C134.761 122 127.094 114.933 121.761 105.2C116.561 95.4667 113.961 82.6667 113.961 66.8C113.961 50.6667 116.561 37.7333 121.761 28C127.094 18.2667 134.761 11.2 144.761 6.79999C154.761 2.39999 166.961 0.199991 181.361 0.199991C195.761 0.199991 207.961 2.39999 217.961 6.79999C227.961 11.2 235.561 18.2667 240.761 28C246.094 37.7333 248.761 50.6667 248.761 66.8C248.761 82.6667 246.094 95.4667 240.761 105.2C235.561 114.933 227.961 122 217.961 126.4C207.961 130.8 195.761 133 181.361 133ZM181.361 96.6C189.628 96.6 195.561 94.2667 199.161 89.6C202.894 84.9333 204.761 77.3333 204.761 66.8C204.761 55.7333 202.894 48 199.161 43.6C195.561 39.0667 189.628 36.8 181.361 36.8C172.961 36.8 166.894 39.0667 163.161 43.6C159.561 48 157.761 55.7333 157.761 66.8C157.761 77.3333 159.561 84.9333 163.161 89.6C166.894 94.2667 172.961 96.6 181.361 96.6ZM260.734 131V2.19999H320.134C333.601 2.19999 345.134 4.39999 354.734 8.8C364.334 13.0667 371.734 20 376.934 29.6C382.134 39.0667 384.734 51.6667 384.734 67.4C384.734 89.6667 379.068 105.867 367.734 116C356.401 126 340.534 131 320.134 131H260.734ZM303.734 98.2H314.934C320.401 98.2 325.068 97.4 328.934 95.8C332.801 94.2 335.734 91.2 337.734 86.8C339.868 82.4 340.934 75.9333 340.934 67.4C340.934 58.8667 340.001 52.4 338.134 48C336.268 43.6 333.401 40.6 329.534 39C325.668 37.2667 320.801 36.4 314.934 36.4H303.734V98.2ZM460.072 133C445.672 133 433.472 130.8 423.472 126.4C413.472 122 405.805 114.933 400.472 105.2C395.272 95.4667 392.672 82.6667 392.672 66.8C392.672 50.6667 395.272 37.7333 400.472 28C405.805 18.2667 413.472 11.2 423.472 6.79999C433.472 2.39999 445.672 0.199991 460.072 0.199991C474.472 0.199991 486.672 2.39999 496.672 6.79999C506.672 11.2 514.272 18.2667 519.472 28C524.805 37.7333 527.472 50.6667 527.472 66.8C527.472 82.6667 524.805 95.4667 519.472 105.2C514.272 114.933 506.672 122 496.672 126.4C486.672 130.8 474.472 133 460.072 133ZM460.072 96.6C468.339 96.6 474.272 94.2667 477.872 89.6C481.605 84.9333 483.472 77.3333 483.472 66.8C483.472 55.7333 481.605 48 477.872 43.6C474.272 39.0667 468.339 36.8 460.072 36.8C451.672 36.8 445.605 39.0667 441.872 43.6C438.272 48 436.472 55.7333 436.472 66.8C436.472 77.3333 438.272 84.9333 441.872 89.6C445.605 94.2667 451.672 96.6 460.072 96.6ZM580.461 131V2.19999H623.461V98.2H678.661V131H580.461ZM686.711 131V2.19999H729.711V131H686.711ZM789.095 133C780.162 133 771.629 132.267 763.495 130.8C755.495 129.333 748.695 127.267 743.095 124.6V91C749.362 93.9333 756.229 96.3333 763.695 98.2C771.295 100.067 778.229 101 784.495 101C789.829 101 793.895 100.467 796.695 99.4C799.629 98.3333 801.095 96.3333 801.095 93.4C801.095 90.0667 798.895 87.6667 794.495 86.2C790.095 84.6 783.762 82.4 775.495 79.6C766.962 76.6667 760.229 73.5333 755.295 70.2C750.495 66.7333 747.029 62.6 744.895 57.8C742.762 52.8667 741.695 46.8667 741.695 39.8C741.695 13.4 760.029 0.199991 796.695 0.199991C801.229 0.199991 806.029 0.533324 811.095 1.19999C816.295 1.73332 821.229 2.46666 825.895 3.4C830.695 4.2 834.762 5.13333 838.095 6.2V40C831.295 37.3333 825.029 35.4667 819.295 34.4C813.695 33.2 808.562 32.6 803.895 32.6C799.229 32.6 794.962 33 791.095 33.8C787.362 34.4667 785.495 36.3333 785.495 39.4C785.495 41.9333 787.162 43.8667 790.495 45.2C793.829 46.4 799.429 48.0667 807.295 50.2C817.829 53.1333 825.762 56.6 831.095 60.6C836.562 64.6 840.229 69.3333 842.095 74.8C844.095 80.1333 845.095 86.2667 845.095 93.2C845.095 105.2 840.429 114.867 831.095 122.2C821.762 129.4 807.762 133 789.095 133ZM883.423 131V33.6H849.023V2.19999H961.023V33.6H926.423V131H883.423Z" fill="white"/>
            </svg>
          </div>
          <div className="scdn-cvd">
            <div className="rdBtnCon">
              <button onClick={openModal}><i className="fa-solid fa-plus"></i></button>
              <button><i className="fa-solid fa-pencil"></i></button>
              <button><i className="fa-solid fa-trash"></i></button>
              <button><i className="fa-solid fa-check"></i></button>
            </div>
          </div>
          <div className="wrapCon">
            <div className="cardCon">
              {tasks.length === 0 ? (
                <div className="empty">
                  <img src={Empty} alt="" />
                  <p>No Pending Task</p>
                </div>
              ) : (
                <>
                  <div className="cardHead">
                    <div className="priorityHead">
                      <p>Priority</p>
                    </div>
                    <div className="CategoryHead">
                      <p>Category</p>
                    </div>
                    <div className="toolsHead">
                      <p>Tools</p>
                    </div>
                  </div>
                  {tasks.map(task => (
                    <div className="cards" key={task.id}>
                      <div className="nameDate">
                        <h3>{task.task}</h3>
                        <time dateTime={task.time}>{new Date(task.time).toLocaleString()}</time>
                      </div>
                      <div className="priority">
                        <p className={getPriorityClass(task.priority)}>{task.priority}</p>
                      </div>
                      <div className="Category">
                        <p>{task.category}</p>
                      </div>
                      <div className="tools">
                        <i className="fa-solid fa-pencil"></i>
                        <i className="fa-solid fa-trash"></i>
                        <label className="checkBox">
                          <input type="checkbox" />
                          <div className="transition"></div>
                        </label>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
