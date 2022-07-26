import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion"

export const AccordionCard = ({ page }) => {
  const accordionItems = page.acf.accordion

  return (
    <section className="m-accordion-card">
      <Accordion allowZeroExpanded={true}>
        {accordionItems.map((item, index) => {
          const { titolo, descrizione } = item

          return (
            <div key={titolo} data-aos="fade-left" data-aos-delay={index * 100}>
              <AccordionItem>
                <AccordionItemHeading aria-level={3}>
                  <AccordionItemButton>{titolo} </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <p>{descrizione}</p>
                </AccordionItemPanel>
              </AccordionItem>
            </div>
          )
        })}
      </Accordion>
    </section>
  )
}
