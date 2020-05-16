import moment from "moment";

class Order {
  constructor(id, items, total, date) {
    this.id = id;
    this.items = items;
    this.total = total;
    this.date = date;
  }

  get readableDate() {
    // This is a JavaScript built in way of formatting dates.
    // However, it doesn't work on Android, only iOS.
    // return this.date.toLocaleDateString("en-EN", {
    //   year: "numeric",
    //   month: "long",
    //   day: "numeric",
    //   hour: "2-digit",
    //   minute: "2-digit",
    // });

    return moment(this.date).format("MMMM Do YYYY, HH:mm");
  }
}

export default Order;
