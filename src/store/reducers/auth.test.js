import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("Auth reducer", () => {
  it("should return the ", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/"
    });
  });

  it("should return the ", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: "/"
        },
        { type: actionTypes.AUTH_SUCCESS, idToken: "heyd", userId: "yes" },
        {}
      )
    ).toEqual({
      token: "heyd",
      userId: "yes",
      error: null,
      loading: false,
      authRedirectPath: "/"
    });
  });
});
