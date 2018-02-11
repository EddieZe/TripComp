@echo on
@echo -----------------------------------------------------------------
@echo IMPORTANT NOTES:
@echo ----------------
@echo Will zip TripComp data daily
@echo -----------------------------------------------------------------
ant -buildfile back_up.xml >> ./back_up.log 2>&1

