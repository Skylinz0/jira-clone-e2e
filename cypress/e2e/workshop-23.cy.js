import ThisModal from "../pages/ThisModal";
import marilyWorkshop from "../pages/marilyWorkshop";
import EditMarily from "../pages/EditMarily";
import ModalBacklog from "../pages/ModalBacklog";

describe('Issue is create', () => {
    beforeEach(() => {
        cy.visit('/');
        ThisModal.createNewModal();
        ThisModal.createIssue();
        ThisModal.issueIsCreated();       
    });

    const selectAdd = "10";
    const selectAdd2 = "20";


    it('Time tracking 1 (add estimation)', () => {
        ModalBacklog.checkTrackingTime();
        ModalBacklog.selectEstimation(selectAdd);
        ModalBacklog.estimationSuccessful();
        

    });

    it('Time tracking 2 (update estimation)', () => {  
        ModalBacklog.selectEstimation(selectAdd);     
        ModalBacklog.selectUpdate(selectAdd2);
        ModalBacklog.completedHours2(selectAdd2);

    });

    it('Time tracking 3 (remove estimation)', () => {

        ModalBacklog.selectRemove();
        ModalBacklog.removeEstimation();     


    });

    it('Time tracking 4 (log time)', () => {
        ModalBacklog.selectLogTime();
        
    });

    it('Time tracking 5 (remove logged time)', () => {
        ModalBacklog.removeLogTime();
        
    });

});



