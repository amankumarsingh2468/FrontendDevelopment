var options = {
    width: "100%",
    pdfOpenParams: {
        view: 'FitH',
        pagemode: 'thumbs',
        scrollbar: 0,
    }
}

PDFObject.embed("/schedules/day1.pdf", "#schedule", options);

