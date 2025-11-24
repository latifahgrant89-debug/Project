document.getElementById("quiz-form").addEventListener("submit", function(e){
  e.preventDefault();


  const name = document.getElementById("name").value.trim() || "Student";
  const gpa = parseFloat(document.getElementById("gpa").value) || 0;
  const grade = document.getElementById("grade").value;
  const residency = document.getElementById("residency").value;
  const major = [...document.querySelectorAll("input[name='major']:checked")].map(i=>i.value);
  const activity = [...document.querySelectorAll("input[name='activity']:checked")].map(i=>i.value);
  const volhours = document.getElementById("volhours").value;
  const awards = document.querySelector("input[name='awards']:checked")?.value || "";
  const income = document.getElementById("income").value;
  const lead = document.querySelector("input[name='lead']:checked")?.value || "";
  const why = [...document.querySelectorAll("input[name='why']:checked")].map(i=>i.value);


  // Scholarships list
  const scholarshipsList = [
    {title:"Virginia Higher Education Fund Scholarship", desc:"For Virginia juniors or seniors with 3.0+ GPA. Awards $1,000-$20,000.", link:"https://vahigheredfund.com/", criteria:{residency:["Virginia"], gpa:3.0, grade:["hs_junior","hs_senior"]}},
    {title:"Washington DC Meg Granhamn Scholarship", desc:"High school seniors with strong volunteer record. Min GPA 3.0.", link:"https://washington.jl.org/home/community/students/", criteria:{residency:["DC"], grade:["hs_senior"], gpa:3.0, volhours_min:1}},
    {title:"DC Metropolitan Area Chapter AABE Scholarship", desc:"High school seniors in DC, MD, or VA with 3.0+ GPA.", link:"https://www.aabe.org/index.php?component=pages&id=4", criteria:{residency:["DC","Maryland","Virginia"], grade:["hs_junior","hs_senior"], gpa:3.0}},
    {title:"Dunkin Baltimore / Metro DC Regional Scholarship", desc:"Regional students with 3.0+ GPA or equivalent.", link:"https://scholarshipamerica.org/scholarship/dunkinbaltimoredc/", criteria:{residency:["DC","Maryland","Baltimore"], gpa:3.0}},
    {title:"Bold Journey Scholarship", desc:"For students who are current or former clients of LSSNCA, pursuing higher education.", link:"https://bold.org/scholarships/DOME-journey-scholarship/", criteria:{residency:["DC","Maryland","Virginia"], major_required:true}},
    {title:"Jamaur Law Foundation Scholarship", desc:"High school seniors with min 3.0 GPA, leadership, essay & report card.", link:"https://www.jamaurlawfoundation.org/scholarships", criteria:{gpa:3.0, grade:["hs_junior","hs_senior"], lead:"yes"}},
    {title:"DC Tuition Assistance Grant (DCTAG)", desc:"DC residents attending participating colleges. Maintain domicile while enrolled.", link:"https://osse.dc.gov/dctag", criteria:{residency:["DC"]}},
    {title:"Credit Union Foundation MD|DC College Scholarship", desc:"Essay or video-based scholarship for college/trade school students in MD/DC credit unions.", link:"https://cufound.org/credit-union-resources/support-student-members/scholarships/", criteria:{residency:["DC","Maryland"]}}
  ];


  // Score scholarships based on how well they match the user's answers
  let scoredScholarships = scholarshipsList.map(sch => {
    let score = 0;
    let crit = sch.criteria;
    if(crit.residency && crit.residency.includes(residency)) score++;
    if(crit.grade && crit.grade.includes(grade)) score++;
    if(crit.gpa && gpa >= crit.gpa) score++;
    if(crit.volhours_min && parseInt(volhours) >= crit.volhours_min) score++;
    if(crit.lead && lead === crit.lead) score++;
    if(crit.major_required && major.length > 0) score++;
    return {...sch, score};
  });


  scoredScholarships.sort((a,b) => b.score - a.score);
  
  if(scoredScholarships[0].score === 0){
    scoredScholarships = [{
      title:"Explore Scholarships",
      desc:"No exact match found. Explore scholarships by GPA, grade, interests, and volunteer activities.",
      link:"#",
      score:0
    }];
  }


  let message = `<h3>Hello ${name}, here are your scholarship matches:</h3><ul>`;
  scoredScholarships.forEach(s => {
    message += `<li><strong>${s.title}</strong>: ${s.desc} ${s.link ? `<a href="${s.link}" target="_blank">Apply Here</a>` : ""}</li>`;
  });
  message += "</ul>";

  document.getElementById("result").innerHTML = message;

  document.getElementById("result").scrollIntoView({behavior:"smooth"});
});
