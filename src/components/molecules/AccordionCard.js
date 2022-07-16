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
        {accordionItems.map((item) => {
          const { titolo, descrizione } = item

          return (
            <AccordionItem key={titolo}>
              <AccordionItemHeading aria-level={3}>
                <AccordionItemButton>{titolo} </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p>{descrizione}</p>
              </AccordionItemPanel>
            </AccordionItem>
          )
        })}
      </Accordion>
    </section>
  )
}
