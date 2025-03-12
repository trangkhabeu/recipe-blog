import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";

export const SelectTravelerList = [
  {
    id: 1,
    title: "Just Me",
    desc: "Tự mình khám phá thế giới.",
    icon: "✈️",
    people: "1",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Đồng hành cùng nhau.",
    icon: "🥂",
    people: "2 people",
  },
  {
    id: 3,
    title: "Family",
    desc: "Phiêu lưu và tận hưởng niềm vui.",
    icon: "🏡",
    people: "3 to 5 people",
  },
  {
    id: 4,
    title: "Friends",
    desc: "Thử thách và khám phá cùng bạn bè.",
    icon: "⛵",
    people: "5 to 10 people",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of costs",
    icon: "💵",
    range: "0 to 20000000",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep cost on the average side",
    icon: "💰",
    range: "20000001 to 50000000",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Dont worry about cost",
    icon: "💸",
    range: "50000001 to 100000000",
  },
];

export const SelectPayMethod = [
  {
    id: 1,
    title: "Paypal",
    icon: <Entypo name="paypal" size={24} color="black" />,
  },
  {
    id: 2,
    title: "Master Card",
    icon: <FontAwesome name="cc-mastercard" size={24} color="black" />,
  },
  {
    id: 3,
    title: "Credit Card",
    icon: <AntDesign name="creditcard" size={24} color="black" />,
  },
];

export const AI_PROMT =
  "{location}, {totalDays} Days and {totalNight} Night for {traveler} with a {budget} budget with Flight details, Flight Price with booking URL, Hotels options list with HotelName, Hotel address, Price, hotel image URL, geo coordinates, rating, descriptions and Places to visit nearby with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time to travel each of the locations for {totalDays} days and {totalNight}.";

