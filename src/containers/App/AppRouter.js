import React from "react";
import { Route, Switch } from "react-router-dom";
import asyncComponent from "../../helpers/AsyncFunc";
//disdf
class AppRouter extends React.Component {
  render() {
    const { url } = this.props;
    return (
      <Switch>
        {/* Forbiden  */}
        <Route
          exact
          path={`${url}/pinagbabawal/roles`}
          component={asyncComponent(() => import("../../views/settings/roles"))}
        />
        <Route
          exact
          path={`${url}/pinagbabawal/schools`}
          component={asyncComponent(() =>
            import("../../views/settings/schools")
          )}
        />
        <Route
          exact
          path={`${url}/pinagbabawal/users`}
          component={asyncComponent(() =>
            import("../../views/settings/superadmin")
          )}
        />
        {/* End of Inventory */}
        {/* -------------------------------------------------------------------------------- */}
        {/* Debugging pages */}
        <Route
          exact
          path={`${url}/web/tracker`}
          component={asyncComponent(() =>
            import("../../views/auth/webTracking")
          )}
        />
        <Route
          exact
          path={`${url}/document/tracker`}
          component={asyncComponent(() =>
            import("../../views/auth/documentTracking")
          )}
        />
        {/* End of Debugging pages */}
        {/* Headquarters */}
        {/* Headquarter -> Settings */}
        <Route
          exact
          path={`${url}/hq/school/levels`}
          component={asyncComponent(() =>
            import("../../views/headquarters/settings/levels")
          )}
        />
        {/* <Route
          exact
          path={`${url}/hq/school/rooms`}
          component={asyncComponent(() =>
            import("../../views/headquarters/events/rooms")
          )}
        /> */}
        <Route
          exact
          path={`${url}/hq/school/batch`}
          component={asyncComponent(() =>
            import("../../views/headquarters/settings/batch")
          )}
        />
        <Route
          exact
          path={`${url}/hq/school/classrooms`}
          component={asyncComponent(() =>
            import("../../views/headquarters/events/classrooms")
          )}
        />
        <Route
          exact
          path={`${url}/hq/banner`}
          component={asyncComponent(() =>
            import("../../views/headquarters/settings")
          )}
        />
        <Route
          exact
          path={`${url}/hq/memorandum`}
          component={asyncComponent(() =>
            import("../../views/headquarters/settings/cmemo")
          )}
        />
        <Route
          exact
          path={`${url}/hq/school/about`}
          component={asyncComponent(() =>
            import("../../views/headquarters/settings/about")
          )}
        />
        pageants
        <Route
          exact
          path={`${url}/hq/access`}
          component={asyncComponent(() =>
            import("../../views/headquarters/settings/access")
          )}
        />
        <Route
          exact
          path={`${url}/hq/school/subject`}
          component={asyncComponent(() =>
            import("../../views/settings/subjects")
          )}
        />
        <Route
          exact
          path={`${url}/hq/school/departments`}
          component={asyncComponent(() =>
            import("../../views/headquarters/settings/departments")
          )}
        />
        <Route
          exact
          path={`${url}/hq/school/sections`}
          component={asyncComponent(() =>
            import("../../views/headquarters/settings/sections")
          )}
        />
        <Route
          exact
          path={`${url}/hq/school/users`}
          component={asyncComponent(() => import("../../views/settings/users"))}
        />
        {/* End of  Headquarter -> Settings */}
        {/*  Headquarter -> Events */}
        <Route
          exact
          path={`${url}/hq/batch`}
          component={asyncComponent(() =>
            import("../../views/headquarters/events/batches")
          )}
        />
        <Route
          exact
          path={`${url}/hq/admissions`}
          component={asyncComponent(() =>
            import("../../views/headquarters/events/admissions")
          )}
        />
        <Route
          exact
          path={`${url}/hq/batches`}
          component={asyncComponent(() =>
            import("../../views/headquarters/events/batches")
          )}
        />
        <Route
          exact
          path={`${url}/hq/academic/calendar`}
          component={asyncComponent(() =>
            import("../../views/headquarters/calendar")
          )}
        />
        <Route
          exact
          path={`${url}/hq/newsfeed`}
          component={asyncComponent(() =>
            import("../../views/headquarters/events/newsfeed")
          )}
        />
        {/* End of  Headquarter -> Events */}
        <Route
          exact
          path={`${url}/hq/school/tree`}
          component={asyncComponent(() =>
            import("../../views/headquarters/orgChart/tree/index")
          )}
        />
        {/* End of Headquarter -> Organizational chart */}
        <Route
          exact
          path={`${url}/hq/school/shs`}
          component={asyncComponent(() =>
            import("../../views/headquarters/academic-focus/strand")
          )}
        />
        {/* End of Headquarters -> Academic Focus */}
        {/* Headquarters -> Human Resources */}
        <Route
          exact
          path={`${url}/hq/school/applicants`}
          component={asyncComponent(() =>
            import("../../views/headquarters/human-resources/applicants")
          )}
        />
        <Route
          exact
          path={`${url}/hq/school/staffs`}
          component={asyncComponent(() =>
            import("../../views/headquarters/human-resources/staff")
          )}
        />
        <Route
          exact
          path={`${url}/hq/school/faculties`}
          component={asyncComponent(() =>
            import("../../views/headquarters/human-resources/faculty")
          )}
        />
        {/* End of Headquarters -> Human Resources */}
        {/* End of Headquarters */}
        {/* -------------------------------------------------------------------------------- */}
        {/*
         * Classroom
         */}
        <Route
          exact
          path={`${url}/welcome/faculty`}
          component={asyncComponent(() =>
            import("../../components/utility/banner/faculty/float")
          )}
        />
        <Route
          exact
          path={`${url}/welcome`}
          component={asyncComponent(() =>
            import("../../components/utility/banner/students/float")
          )}
        />
        <Route
          exact
          path={`${url}/cr/banner`}
          component={asyncComponent(() =>
            import("../../views/audiences/settings")
          )}
        />
        <Route
          exact
          path={`${url}/cr/:id/subject`}
          component={asyncComponent(() =>
            import("../../views/audiences/subject")
          )}
        />
        <Route
          exact
          path={`${url}/cr/:classroom/sections/:subject/subject`}
          component={asyncComponent(() =>
            import("../../views/auditors/sections")
          )}
        />
        <Route
          exact
          path={`${url}/cr/subjects`}
          component={asyncComponent(() =>
            import("../../views/auditors/subjects")
          )}
        />
        {/* auditors -> Students */}
        <Route
          exact
          path={`${url}/cr/advisories`}
          component={asyncComponent(() =>
            import("../../views/auditors/advisories")
          )}
        />
        <Route
          exact
          path={`${url}/cr/loads`}
          component={asyncComponent(() => import("../../views/auditors/loads"))}
        />
        <Route
          exact
          path={`${url}/classroom/sections/schedules`}
          component={asyncComponent(() =>
            import("../../views/audiences/schedules")
          )}
        />
        <Route
          exact
          path={`${url}/classroom/banner`}
          component={asyncComponent(() =>
            import("../../views/auditors/settings")
          )}
        />
        <Route
          exact
          path={`${url}/classroom/faculty/request`}
          component={asyncComponent(() =>
            import("../../views/auditors/settings/request")
          )}
        />
        <Route
          exact
          path={`${url}/classroom/request`}
          component={asyncComponent(() =>
            import("../../views/audiences/settings/request")
          )}
        />
        {/* End of CLassroom */}
        {/* -------------------------------------------------------------------------------- */}
        {/* Data Tracking */}
        <Route
          exact
          path={`${url}/tracking/dll`}
          component={asyncComponent(() =>
            import("../../views/authors/data-tracking/dll")
          )}
        />
        <Route
          exact
          path={`${url}/tracking/doc`}
          component={asyncComponent(() =>
            import("../../views/authors/data-tracking/doc")
          )}
        />
        <Route
          exact
          path={`${url}/tracking/request`}
          component={asyncComponent(() =>
            import("../../views/authors/data-tracking/request")
          )}
        />
        <Route
          exact
          path={`${url}/data/tracking/drive`}
          component={asyncComponent(() =>
            import("../../views/authors/data-tracking/drive/plan")
          )}
        />
        <Route
          exact
          path={`${url}/data/tracking/viewer`}
          component={asyncComponent(() =>
            import("../../views/authors/data-tracking/viewer")
          )}
        />
        {/* Tracking */}
        <Route
          exact
          path={`${url}/tracking/banner`}
          component={asyncComponent(() =>
            import("../../views/authors/data-tracking/settings")
          )}
        />
        <Route
          exact
          path={`${url}/tracking/whlp`}
          component={asyncComponent(() =>
            import("../../views/authors/data-tracking/whlp")
          )}
        />
        <Route
          exact
          path={`${url}/admin/tracking/signing`}
          component={asyncComponent(() =>
            import("../../views/authors/data-tracking/admin/signing")
          )}
        />
        {/* End of Tracking */}
        {/* -------------------------------------------------------------------------------- */}
        {/* Profile */}
        <Route
          exact
          path={`${url}/profile`}
          component={asyncComponent(() => import("../../views/auth/profile"))}
        />
        {/* End of Profile */}
        {/* -------------------------------------------------------------------------------- */}
      </Switch>
    );
  }
}

export default AppRouter;
