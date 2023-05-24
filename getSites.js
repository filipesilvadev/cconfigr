let results = [];

const extractDataFromPage = () => {
  let names = Array.from(document.querySelectorAll('.sc-feryYK.Mgufo')).map(el => el.textContent);
  let statuses = Array.from(document.querySelectorAll('.sc-eTpRJs.cGkcGr')).map(el => el.textContent);

  if(names.length !== statuses.length) {
    console.error('Mismatch in the length of names and statuses. Stopping script.');
    return false;
  }

  for(let i = 0; i < names.length; i++) {
    results.push({name: names[i], status: statuses[i]});
  }

  return true;
}

const waitForDOMLoad = () => {
  return new Promise(resolve => {
    let checkInterval = setInterval(() => {
      let testElement = document.querySelector('.sc-feryYK.Mgufo');
      if(testElement) {
        clearInterval(checkInterval);
        resolve();
      }
    }, 500);
  });
}

const clickNextPage = () => {
  let nextButton = document.querySelector('.sc-kEYyzF.kEDnGZ .sc-kkGfuU.sc-cvbbAY.iJtrpi');
  if(nextButton) {
    nextButton.click();
    return true;
  }
  return false;
}

const run = async () => {
  for(let i = 1; i <= 13; i++) {
    let extractionSuccess = extractDataFromPage();
    if(!extractionSuccess) {
      console.error(`Data extraction failed on page ${i}. Stopping script.`);
      break;
    }

    let nextPageExists = clickNextPage();
    if(!nextPageExists && i !== 13) {
      console.error(`Failed to click to next page from page ${i}. Stopping script.`);
      break;
    }

    await waitForDOMLoad();
  }

  console.log(results);
}

run();
