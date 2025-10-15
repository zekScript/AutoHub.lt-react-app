
// The formula is: HP = kW x 1.34102.      HP = kW x 1.34102 Example: \(50\) kW \(\times \) \(1.34102\) \(\approx \) \(67.051\) HP
export default function engineConverter(x){
      return Math.floor((x * 1.34102))
}