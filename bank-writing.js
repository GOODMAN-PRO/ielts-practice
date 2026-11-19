// Writing prompts. Written by Codex for the course notes,
// turned into data by Claude so the app can draw the Task 1 figures. Original practice prompts, not official IELTS tasks.
// All places and figures are invented.
(function () {
var T1 = 'Summarise the information by selecting and reporting the main features, and make comparisons where relevant.';
var T2 = 'Give reasons for your answer and include any relevant examples from your own knowledge or experience.';
function w1(n, kind, title, prompt, visual, extra) {
  WRITING.push(Object.assign({ id: 'W1-' + (n < 10 ? '0' : '') + n, task: 1, kind: kind, title: title, prompt: prompt, rubric: T1, visual: visual }, extra || {}));
}
function w2(n, kind, title, prompt, extra) {
  WRITING.push(Object.assign({ id: 'W2-' + (n < 10 ? '0' : '') + n, task: 2, kind: kind, title: title, prompt: prompt, rubric: T2 }, extra || {}));
}

// ---------- Task 1
w1(1, 'Line graph', 'Library loans',
  'The graph below shows the number of items borrowed each year from a town library between 2018 and 2024, by format.',
  { type: 'line', unit: 'Loans per year (thousands)', x: ['2018', '2020', '2022', '2024'], yMax: 70, yStep: 10,
    series: [{ name: 'Printed books', values: [60, 58, 54, 50] }, { name: 'E-books', values: [8, 15, 24, 38] }, { name: 'Audiobooks', values: [5, 8, 12, 20] }] },
  { drill: 'W1-D1', model: true });

w1(2, 'Line graph', 'Three bus routes',
  'The graph below shows the average number of passengers per week on three bus routes in one town from 2019 to 2024.',
  { type: 'line', unit: 'Passengers per week (thousands)', x: ['2019', '2020', '2021', '2022', '2023', '2024'], yMax: 50, yStep: 10,
    series: [{ name: 'North route', values: [22, 18, 24, 30, 38, 44] }, { name: 'South route', values: [35, 28, 30, 31, 33, 34] }, { name: 'East route', values: [12, 10, 16, 22, 29, 37] }] },
  { drill: 'W1-D3' });

w1(3, 'Bar chart', 'Evening courses',
  'The chart below shows the number of people in two age groups who enrolled in four evening courses at one centre in 2025.',
  { type: 'bar', unit: 'Number of people', categories: ['Photography', 'Cooking', 'Coding', 'Gardening'], yMax: 120, yStep: 20,
    series: [{ name: 'Under 30', values: [80, 60, 110, 35] }, { name: 'Aged 30 or over', values: [45, 90, 40, 75] }] },
  { note: 'Enrolled means joined a course. Each person takes one of the four courses.', model: true });

w1(4, 'Bar chart', 'Travel to school',
  'The chart below shows how students at one school usually travelled to school in 2020 and 2025.',
  { type: 'bar', unit: 'Percentage of students', suffix: '%', categories: ['Walking', 'Bus', 'Car', 'Bicycle'], yMax: 50, yStep: 10,
    series: [{ name: '2020', values: [18, 30, 42, 10] }, { name: '2025', values: [25, 35, 25, 15] }] },
  { drill: 'W1-D4 (tutor chooses 4, 6 or 8)' });

w1(5, 'Pie charts', 'Household spending',
  'The charts below show how the average household in one town divided its spending in 2015 and 2025.',
  { type: 'pies', note: 'The total amount of money spent is not given.',
    pies: [{ title: '2015', slices: [['Housing', 30], ['Food', 25], ['Transport', 20], ['Leisure', 15], ['Other', 10]] },
      { title: '2025', slices: [['Housing', 38], ['Food', 22], ['Transport', 15], ['Leisure', 15], ['Other', 10]] }] },
  { model: true });

w1(6, 'Pie charts', 'Water use',
  'The charts below show the shares of total water use in one district in 2000 and 2025.',
  { type: 'pies', note: 'The total volume of water used is not shown.',
    pies: [{ title: '2000', slices: [['Homes', 25], ['Industry', 45], ['Farming', 20], ['Public services', 10]] },
      { title: '2025', slices: [['Homes', 35], ['Industry', 25], ['Farming', 25], ['Public services', 15]] }] },
  { drill: 'W1-D4 (tutor chooses 4, 6 or 8)' });

w1(7, 'Table', 'Journeys to a college',
  'The table below compares four ways of making the same 10-kilometre journey to a college in 2025.',
  { type: 'table', columns: ['Method', 'Journey time (minutes)', 'Direct cost (baht)'],
    rows: [['Bus', 35, 20], ['Train', 22, 45], ['Car', 28, 70], ['Bicycle', 40, 0]] },
  { note: 'Time covers the whole journey. Cost is what the traveller pays for one trip; buying and looking after the bicycle is not included. The baht is the money of Thailand.', model: true });

w1(8, 'Table', 'Recreation sites',
  'The table below gives information about visits to four recreation sites in 2020 and 2025, and the number of staff at each site in 2025.',
  { type: 'table', columns: ['Site', 'Visits in 2020 (thousands)', 'Visits in 2025 (thousands)', 'Staff in 2025'],
    rows: [['Pool', 42, 68, 12], ['Sports hall', 75, 72, 18], ['Art centre', 30, 55, 8], ['Public park', 90, 120, 22]] },
  { note: 'Recreation means activities done for enjoyment. Visits count entries, not different people.', drill: 'W1-D4 (tutor chooses 4, 6 or 8)' });

w1(9, 'Mixed charts', 'Bicycle hire',
  'The graph below shows the average number of bicycle-hire trips per month in one city from 2019 to 2025. The pie chart shows the main purpose of those trips in 2025.',
  { type: 'mixed', parts: [
    { type: 'line', caption: 'Average monthly trips', unit: 'Trips per month (thousands)', x: ['2019', '2021', '2023', '2025'], yMax: 80, yStep: 20,
      series: [{ name: 'Bicycle-hire trips', values: [20, 32, 50, 72] }] },
    { type: 'pies', pies: [{ title: 'Main purpose of trips, 2025', slices: [['Travel to or from work', 50], ['Shopping', 20], ['Leisure', 30]] }] }] },
  { note: 'Bicycle hire means paying to use a bicycle for a short time. Each trip has one main purpose.', model: true });

w1(10, 'Mixed charts', 'Town waste',
  'The bar chart below shows the total waste collected by one town in three years. The line graph shows the percentage of that waste sent for recycling.',
  { type: 'mixed', parts: [
    { type: 'bar', caption: 'Total waste collected', unit: 'Tonnes', categories: ['2016', '2020', '2024'], yMax: 500, yStep: 100,
      series: [{ name: 'Total waste', values: [400, 450, 420] }] },
    { type: 'line', caption: 'Share sent for recycling', unit: 'Percentage of total waste', suffix: '%', x: ['2016', '2020', '2024'], yMax: 60, yStep: 10,
      series: [{ name: 'Sent for recycling', values: [20, 35, 50] }] }] },
  { note: 'Recycling means processing used material so it can be used again.', drill: 'W1-D5' });

w1(11, 'Process', 'Reusable bottles',
  'The diagram below shows how a depot handles returned glass bottles.',
  { type: 'process', steps: ['Used bottles arrive at the depot', 'Caps are removed', 'Bottles are rinsed with water',
    'Bottles are washed with detergent at 70°C', 'Bottles are rinsed with clean water', 'Bottles are dried with warm air',
    { text: 'Bottles are checked for cracks', branch: [['Cracked', 'Sent for recycling'], ['No cracks', 'Packed, 20 per crate, and delivered to cafés']] }] },
  { note: 'A depot is a place where items are collected and prepared. Detergent is a cleaning liquid. A crate is a strong container for carrying goods.', drill: 'W1-D2 (introduction and overview only)', model: true });

w1(12, 'Process', 'Dried apple pieces',
  'The diagram below shows how packets of dried apple pieces are produced.',
  { type: 'process', steps: ['Ripe apples are selected', 'Apples are washed', 'Cores are removed', 'Apples are cut into slices 5 mm thick',
    'Slices are dried with hot air at 60°C for 6 hours', 'Slices are cooled for 30 minutes', '100 g is put into each packet', 'Packets are sealed and labelled'] },
  { note: 'The core is the hard middle part of the apple that holds the seeds.', drill: 'W1-D6 (tutor chooses 12 or 14)' });

w1(13, 'Maps', 'A community park',
  'The maps below show a community park in 2010 and in 2025.',
  { type: 'maps', note: 'The park is the same size in both years. A north-south path and an east-west path cross in the middle; both are wider in 2025.',
    panels: [
      { title: '2010', grid: [['Pond', 'Grass', 'Two tennis courts'], ['Flowerbeds', 'Paths cross', 'Storage shed'], ['Car park', 'Entrance', 'Grass']] },
      { title: '2025', grid: [['Pond', 'Playground', 'One basketball court'], ['Flowerbeds', 'Paths cross (wider)', 'Café'], ['Bicycle parking', 'Entrance', 'Picnic area']] }] },
  { drill: 'W1-D2 (introduction and overview only)', model: true });

w1(14, 'Maps', 'A library proposal',
  'The plans below show the ground floor of a library in 2026 and a proposal for the same floor in 2030.',
  { type: 'maps', note: 'The outer walls stay the same. The areas open onto a central space; no new inside walls are planned. The 2030 plan is a proposal, not finished work.',
    panels: [
      { title: '2026', grid: [['Bookshelves', '', 'Bookshelves'], ['', 'Lending desk', 'Wall (no door)'], ["Children's reading area", 'Main entrance', 'Office']] },
      { title: 'Proposed for 2030', grid: [['Study desks', '', 'Computer desks'], ['', 'Lending desk', 'New side entrance'], ["Children's reading area", 'Main entrance', 'Small café']] }] },
  { drill: 'W1-D6 (tutor chooses 12 or 14)' });

// ---------- Task 2
var RES = 'Reserved for the exam-conditions drill W2-D7';
w2(1, 'Opinion', 'Repair lessons', 'Secondary schools should teach every student how to repair simple household items. To what extent do you agree or disagree?', { model: true });
w2(2, 'Opinion', 'Better buses', 'When improving city bus services, local councils should spend more on frequent departures than on making all journeys free. To what extent do you agree or disagree?', { drill: 'W2-D1 (one paragraph)' });
w2(3, 'Opinion', 'Phone storage', "Secondary schools should keep students' phones in a secure place during the whole school day, including breaks. To what extent do you agree or disagree?", { drill: 'W2-D6 pool' });
w2(4, 'Opinion', 'Four-day office week', 'Offices should allow employees to complete their usual weekly hours over four days instead of five. To what extent do you agree or disagree?', { reserved: RES });
w2(5, 'Discuss both views', 'Library space', 'Some people think public libraries should use more space for shared work and study areas. Others think the main use of library space should remain storing books. Discuss both views and give your own opinion.', { model: true });
w2(6, 'Discuss both views', 'School projects', 'Some teachers believe students learn more from group projects. Others believe individual projects are more useful. Discuss both views and give your own opinion.', { drill: 'W2-D2 (one paragraph)' });
w2(7, 'Discuss both views', 'Space in a growing city', 'Some people believe unused land in a growing city should become parks. Others think it should be used to improve roads. Discuss both views and give your own opinion.', { drill: 'W2-D6 pool' });
w2(8, 'Discuss both views', 'Learning about food', 'Some people believe parents should be mainly responsible for teaching children to prepare healthy meals. Others think schools should take this role. Discuss both views and give your own opinion.', { reserved: RES });
w2(9, 'Advantages and disadvantages', 'Returnable containers', 'Some takeaway restaurants lend customers reusable food containers in return for a small deposit, which is repaid when the containers are returned. What are the advantages and disadvantages of this system?', { model: true });
w2(10, 'Advantages and disadvantages', 'Flexible starting times', 'Some companies let staff choose when to start and finish work, provided they complete the required hours. Do the advantages of this approach outweigh the disadvantages?', { drill: 'Read in W2-D2' });
w2(11, 'Advantages and disadvantages', 'Museum information', "Some museums now put detailed information about their exhibits on visitors' phones instead of displaying it beside each object. What are the advantages and disadvantages of this change?", { reserved: RES });
w2(12, 'Advantages and disadvantages', 'Sharing tools', 'Some neighbourhoods run tool libraries, where residents borrow equipment for repairs and gardening. Do the advantages of these services outweigh the disadvantages?', { drill: 'W2-D3 (two paragraphs)' });
w2(13, 'Problem and solution', 'School food waste', 'Many school dining halls throw away large amounts of prepared food at the end of each day. What problems does this cause, and what could schools do to reduce this waste?', { model: true });
w2(14, 'Problem and solution', 'Noise at home', 'Many people who live in apartment buildings are disturbed by noise from neighbouring homes. What problems can this cause, and what measures could reduce them?', { drill: 'Read in W2-D2' });
w2(15, 'Problem and solution', 'Unused bicycle routes', 'Some towns have built bicycle routes, but relatively few residents use them for daily travel. Why might this happen, and what could towns do to increase their use?', { drill: 'W2-D4 (two paragraphs)' });
w2(16, 'Problem and solution', 'Public services online', 'As more public services move online, some older people find it difficult to use them. What problems can this create, and how could service providers help?', { reserved: RES });
w2(17, 'Two-part question', 'Practical evening courses', 'In some towns, more adults are joining short evening courses in practical skills such as cooking or basic repairs. Why might these courses appeal to adults? How can course providers make them easier to attend?', { model: true });
w2(18, 'Two-part question', 'Second-hand purchases', 'Some young adults now choose second-hand goods even when they can afford new ones. Why might they make this choice? Do you think this is a positive development?', { reserved: RES });
w2(19, 'Two-part question', 'Family library visits', 'Some public libraries have begun running weekend activities for parents and children together. Why might families choose these activities? What benefits can they bring to the wider community?', { drill: 'W2-D5 (first full timed essay)' });
w2(20, 'Two-part question', 'Walking on holiday', 'Some travellers spend much more time walking while on holiday than they do at home. Why might this happen? How could towns encourage their residents to walk more in daily life?', { drill: 'W2-D6 pool' });
})();
